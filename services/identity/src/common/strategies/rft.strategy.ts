import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
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

  validate(req: Request | any, payload: IAccessTokenPayload): IRefreshPayload {
    try {
      if (req) {
        throw new UnauthorizedException('UnauthorizedException');
      }
      const refreshToken = req.get('authorization').replace('Bearer', '').trim();
      return {
        id: payload.id,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
