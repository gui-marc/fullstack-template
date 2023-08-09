import { constants } from '@/auth/constants';
import ConfigService from '@/commom/config/config.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  constants.REFRESH_TOKEN_NAME,
) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer ', '').trim();
    return { ...payload, refreshToken };
  }
}
