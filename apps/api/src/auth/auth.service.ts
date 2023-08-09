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
import { MailerService } from '@nestjs-modules/mailer';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly mailService: MailerService,
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

    const accountConfirmationToken =
      await this.generateAccountConfirmationToken(newUser.id, newUser.email);
    await this.updateAccountConfirmationToken(
      newUser.id,
      accountConfirmationToken,
    );

    return { ...tokens, user: newUser, accountConfirmationToken };
  }

  async sendConfirmationEmail(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const accountConfirmationToken =
      await this.generateAccountConfirmationToken(user.id, user.email);
    await this.updateAccountConfirmationToken(
      user.id,
      accountConfirmationToken,
    );

    const confirmUrl = `${this.config.get(
      'APP_URL',
    )}/confirm?token=${accountConfirmationToken}`;

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Welcome Aboard - Confirm your account',
      template: './confirmation',
      context: {
        confirmUrl,
      },
    });
  }

  async sendPasswordRecoverEmail(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const passwordRecoveryToken = await this.generatePasswordRecoveryToken(
      user.id,
      user.email,
    );
    await this.updatePasswordRecoveryToken(user.id, passwordRecoveryToken);

    const recoverUrl = `${this.config.get(
      'APP_URL',
    )}/password-recover?token=${passwordRecoveryToken}`;

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Recover your password',
      template: './password-recover',
      context: {
        recoverUrl,
        email,
      },
    });
  }

  async recoverPassword({ password }: RecoverPasswordDto, token: string) {
    if (!token) {
      throw new InvalidCredentialsException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.config.get('JWT_PASSWORD_RECOVERY_TOKEN_SECRET'),
    });

    if (!payload) {
      throw new InvalidCredentialsException();
    }

    const user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const hashedToken = await this.prisma.passwordRecoveryToken.findUnique({
      where: { userId: user.id },
    });

    const tokensMatch = await argon2.verify(hashedToken.hashedToken, token);

    if (!tokensMatch) {
      throw new InvalidCredentialsException();
    }

    const hashedPassword = await this.hash(password);

    await this.usersService.changePassword(user.id, hashedPassword);

    await this.prisma.passwordRecoveryToken.delete({
      where: { userId: user.id },
    });
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
    return { ...tokens, user };
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

  async confirmAccount(userId: number, confirmToken: string) {
    const accountConfirmationToken =
      await this.prisma.accountConfirmationToken.findUnique({
        where: {
          userId,
        },
      });

    if (!accountConfirmationToken) {
      throw new InvalidCredentialsException();
    }

    const tokenMatches = await argon2.verify(
      accountConfirmationToken.hashedToken,
      confirmToken,
    );

    if (!tokenMatches) {
      throw new InvalidCredentialsException();
    }

    await this.usersService.confirmAccount(userId);
  }

  async validateAccessToken(accessToken: string) {
    try {
      return this.jwtService.verifyAsync(accessToken, {
        secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new InvalidCredentialsException();
    }
  }

  private async hash(data: string) {
    return argon2.hash(data);
  }

  private async generatePasswordRecoveryToken(userId: number, email: string) {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.config.get('JWT_PASSWORD_RECOVERY_TOKEN_SECRET'),
        expiresIn: '1h',
      },
    );

    return token;
  }

  private async updatePasswordRecoveryToken(
    userId: number,
    passwordRecoveryToken: string,
  ) {
    const hashed = await this.hash(passwordRecoveryToken);
    await this.prisma.passwordRecoveryToken.upsert({
      where: { userId },
      update: { hashedToken: hashed },
      create: { hashedToken: hashed, userId },
    });
  }

  private async generateAccountConfirmationToken(
    userId: number,
    email: string,
  ) {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.config.get('JWT_ACCOUNT_CONFIRMATION_TOKEN_SECRET'),
        expiresIn: '1h',
      },
    );

    return token;
  }

  private async updateAccountConfirmationToken(
    userId: number,
    accountConfirmationToken: string,
  ) {
    const hashed = await this.hash(accountConfirmationToken);
    await this.prisma.accountConfirmationToken.upsert({
      where: { userId },
      update: { hashedToken: hashed },
      create: { hashedToken: hashed, userId },
    });
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
