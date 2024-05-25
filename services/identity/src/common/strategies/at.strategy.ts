import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IUser } from '@fdgn/share-ecm';

import { UserService } from '../../modules/user/user.service';
import { IAccessTokenPayload } from '../interfaces';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('authConfig.accessTokenKey'),
    });
  }
  async validate(payload: IAccessTokenPayload): Promise<IUser> {
    try {
      const user = await this.userService.findOne({ id: payload.id });
      if (!user) {
        throw new UnauthorizedException('jwt not accepted');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
