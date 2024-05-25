import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponse } from '@fdgn/common';
import { CurrentUser, IUser } from '@fdgn/share-ecm';

import { AtGuard, IToken } from '../../common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('current-user')
  @UseGuards(AtGuard)
  async currentUser(@CurrentUser() user: IUser): Promise<IUser> {
    try {
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDTO): Promise<IResponse> {
    return await this.authService.signUp(dto);
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDTO): Promise<IToken> {
    return await this.authService.signIn(dto);
  }
}
