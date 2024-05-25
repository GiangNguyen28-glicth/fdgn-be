import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, IUser, RoleType } from '@fdgn/share-ecm';
import { AtGuard } from '../../common';
import { UserEntity } from '../../infra';
import { UserService } from './user.service';
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-permission')
  @UseGuards(AtGuard)
  async getPermission(@Query() filters: { roles: RoleType[] }, @CurrentUser() user: IUser): Promise<any> {
    return await this.userService.getUserPermissionByIdAndRole(user.id, filters?.roles);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOne({ id: Number(id) });
  }
}
