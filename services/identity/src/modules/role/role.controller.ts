import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from '@fdgn/common';
import { Role } from '@fdgn/share-domain';

import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto';
@ApiTags(Role.name)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  // @Get()
  // async findAll(): Promise<IResponse> {
  //   return await this.roleService.findAll();
  // }

  @Post()
  async create(@Body() dto: CreateRoleDTO): Promise<IResponse> {
    return await this.roleService.create(dto);
  }
}
