import AccountConfirmationException from '@/users/exceptions/account-confirmation.exception';
import { UsersService } from '@/users/users.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AccountConfirmationGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get('isPublic', context.getHandler());

    if (isPublic) {
      return true;
    }

    const noConfirmation = this.reflector.get(
      'noConfirmation',
      context.getHandler(),
    );

    if (noConfirmation) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers.authorization.split(' ')[1];
    const payload = await this.authService.validateAccessToken(accessToken);

    const user = await this.usersService.findByEmail(payload['email']);

    if (!user.confirmedAt) {
      throw new AccountConfirmationException();
    }

    return true;
  }
}

export const NoConfirmation = () => SetMetadata('noConfirmation', true);
