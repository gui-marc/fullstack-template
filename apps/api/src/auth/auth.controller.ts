import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, loginDtoSchema } from './dto/login.dto';
import { ValidationPipe } from '@/commom/validation/validation.pipe';
import {
  CreateUserDto,
  createUserDtoSchema,
} from '@/users/dtos/create-user.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Public } from '@/commom/decorators/public.decorator';
import { NoConfirmation } from './guards/account-confirmation.guard';

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
    const response = await this.authService.register(body);

    await this.authService.sendConfirmationEmail(response.user.email);

    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  }

  @Get('send-confirm-email')
  @NoConfirmation()
  async sendConfirmEmail(@Req() req: Request) {
    await this.authService.sendConfirmationEmail(req.user['email']);
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
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

  @Get('confirm-account')
  @NoConfirmation()
  async confirmAccount(@Req() req: Request) {
    return this.authService.confirmAccount(
      req.user['sub'],
      req.query.token as string,
    );
  }
}
