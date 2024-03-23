import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { IResponse } from '@fdgn/common';
import { User } from '@fdgn/share-domain';

import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto';
import { AtGuard, CurrentUser, IToken } from '../../common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('current-user')
  @UseGuards(AtGuard)
  async currentUser(@CurrentUser() user: User): Promise<IResponse> {
    try {
      return { success: true, data: user };
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
