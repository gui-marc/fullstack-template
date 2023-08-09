import { constants } from '@/auth/constants';
import ConfigService from '@/commom/config/config.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  constants.ACCESS_TOKEN_NAME,
) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
