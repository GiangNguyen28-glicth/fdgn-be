import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ProducerMode, RabbitMQProducer } from '@fdgn/rabbitmq';
import { IResponse, hash, throwIfNotExists, compareHash } from '@fdgn/common';

import { AuthConfig, IAccessTokenPayload, IToken } from '../../common';
import { UserService } from '../user';
import { SignInDTO, SignUpDTO } from './dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private config: AuthConfig;
  constructor(
    private mailProducer: RabbitMQProducer<any>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.config = new AuthConfig(this.configService.get<AuthConfig>('authConfig') as any);
  }

  async onModuleInit() {
    this.mailProducer.setConfig({ queue: 'notification_send_mail', mode: ProducerMode.Queue });
  }

  async signUp(dto: SignUpDTO): Promise<IResponse> {
    try {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('Password not match with confirm password');
      }
      const password = await hash(dto.password);
      const user = await this.userService.create({ password, email: dto.email });
      if (user) {
        await this.mailProducer.publish([
          {
            to: dto.email,
            subject: 'Hello world',
            html: '<p>Haha</p>',
          },
        ]);
      }
      return {
        success: true,
        message: 'Check mail to validate your account!',
      };
    } catch (error) {
      throw error;
    }
  }

  async signIn(dto: SignInDTO): Promise<IToken> {
    try {
      const { email, password } = dto;
      const user = await this.userService.findOne({ email });
      throwIfNotExists(user, 'Email not found !');
      const isCorrectPw = await compareHash(password, user.password);
      if (!isCorrectPw) {
        throw new BadRequestException('Password not correct !');
      }
      return await this.generateTokens({ _id: user._id });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async generateTokens(payload: IAccessTokenPayload): Promise<IToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.accessTokenKey,
        expiresIn: this.config.accessTokenExpiresTime,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.refreshTokenKey,
        expiresIn: this.config.refreshTokenExpiresTime,
      }),
    ]);
    // await this.redisService.setex({ key: TOKEN + payload._id, data: refreshToken, ttl: REFRESH_TOKEN_TTL });
    return { accessToken, refreshToken };
  }
}
