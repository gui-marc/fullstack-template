import { Module } from '@nestjs/common';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccountConfirmationGuard } from './guards/account-confirmation.guard';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RefreshTokenGuard,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccountConfirmationGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
