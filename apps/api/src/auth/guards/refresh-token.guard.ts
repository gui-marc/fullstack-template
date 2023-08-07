import { constants } from '../constants';

import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(
  constants.REFRESH_TOKEN_NAME,
) {}
