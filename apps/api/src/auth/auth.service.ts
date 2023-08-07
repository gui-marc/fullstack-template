import ConfigService from '@/commom/config/config.service';
import { PrismaService } from '@/commom/prisma/prisma.service';
import { CreateUserDto } from '@/users/dtos/create-user.dto';
import UserAlreadyExistsException from '@/users/exceptions/user-already-exists.exception';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import InvalidCredentialsException from './exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async register({ email, password }: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(email);
    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    const hash = await this.hash(password);
    const newUser = await this.usersService.create(email, hash);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const userPassword = await this.prisma.password.findUnique({
      where: {
        userId: user.id,
      },
    });

    const passwordMatch = await argon2.verify(userPassword.hash, password);

    if (!passwordMatch) {
      throw new InvalidCredentialsException();
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.refreshToken.delete({
      where: {
        userId,
      },
    });
  }

  async refreshTokens(email: string, refreshToken: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const storedRefreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        userId: user.id,
      },
    });

    const refreshTokenMatches = await argon2.verify(
      storedRefreshToken.token,
      refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new InvalidCredentialsException();
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async me(email: string) {
    return this.usersService.findByEmail(email);
  }

  private async hash(data: string) {
    return argon2.hash(data);
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hash(refreshToken);
    await this.prisma.refreshToken.upsert({
      where: { userId },
      update: { token: hashedRefreshToken },
      create: { token: hashedRefreshToken, userId },
    });
  }

  private async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
