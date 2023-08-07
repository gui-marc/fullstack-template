import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, loginDtoSchema } from './dto/login.dto';
import { ValidationPipe } from '@/commom/validation/validation.pipe';
import {
  CreateUserDto,
  createUserDtoSchema,
} from '@/users/dtos/create-user.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Public } from '@/commom/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe(loginDtoSchema)) body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  async register(
    @Body(new ValidationPipe(createUserDtoSchema)) body: CreateUserDto,
  ) {
    return this.authService.register(body);
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    return this.authService.logout(req.user['email']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Req() req: Request) {
    return this.authService.refreshTokens(
      req.user['email'],
      req.user['refreshToken'],
    );
  }

  @Get('me')
  async me(@Req() req: Request) {
    return this.authService.me(req.user['email']);
  }
}
