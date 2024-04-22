import { Controller, Post, Body, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponse } from '@fdgn/common';
import { CurrentUser, RoleType, User } from '@fdgn/share-domain';
import { UserService } from './user.service';
import { CreateUserDTO, FilterGetOneUser } from './dto';
import { AtGuard } from '../../common';
@ApiTags(User.name)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-permission')
  @UseGuards(AtGuard)
  async getPermission(@Query() filters: { roles: RoleType[] }, @CurrentUser() user: User): Promise<User> {
    return await this.userService.getUserPermissionByIdAndRole(user.id, filters?.roles);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne({ id: Number(id) });
  }
}
