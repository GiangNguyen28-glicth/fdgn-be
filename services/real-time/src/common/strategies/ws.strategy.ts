import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import axios from 'axios';

import { User } from '@fdgn/share-ecm';

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'ws') {
  public identityApi: string;
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('authConfig.accessTokenKey'),
    });
    this.identityApi = this.configService.get<string>('authConfig') as any;
  }

  async validate({ _id }): Promise<User> {
    try {
      const response = await axios.get(`${this.identityApi}/users/${_id}`);
      const user = await response.data;
      if (!user) {
        throw new UnauthorizedException('jwt not accepted');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
