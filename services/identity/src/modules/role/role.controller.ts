import { IResponse } from '@fdgn/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRoleDTO } from './dto';
import { RoleService } from './role.service';
@ApiTags('Role')
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
