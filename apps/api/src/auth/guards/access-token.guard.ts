import { constants } from '../constants';

import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessTokenGuard extends AuthGuard(constants.ACCESS_TOKEN_NAME) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.reflector.get('isPublic', context.getHandler())) {
      return true;
    }

    console.log('AccessTokenGuard');

    return super.canActivate(context);
  }
}
