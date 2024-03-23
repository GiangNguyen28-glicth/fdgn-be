import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponse } from '@fdgn/common';
import { User } from '@fdgn/share-domain';
import { UserService } from './user.service';
import { CreateUserDTO, FilterGetOneUser } from './dto';
@ApiTags(User.name)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') _id: string): Promise<User> {
    return await this.userService.findOne({ _id });
  }

  @Post()
  async create(@Body() dto: CreateUserDTO): Promise<User> {
    return await this.userService.create(dto);
  }
}
