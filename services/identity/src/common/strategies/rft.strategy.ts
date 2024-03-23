import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAccessTokenPayload, IRefreshPayload } from '../interfaces';

@Injectable()
export class RftStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('authConfig.refreshTokenKey'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: IAccessTokenPayload): IRefreshPayload {
    try {
      const refreshToken = req.get('authorization').replace('Bearer', '').trim();
      return {
        _id: payload._id,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
