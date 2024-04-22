import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { AtStrategy, RftStrategy } from '../../common';
import { RoleModule } from '../role';

@Module({
  imports: [UserModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AtStrategy, RftStrategy],
})
export class AuthModule {}
