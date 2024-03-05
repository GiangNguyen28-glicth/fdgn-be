import { Controller, Post, Body } from '@nestjs/common';
import { IResponse } from '@fdgn/common';

import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto';
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDTO): Promise<IResponse> {
    return await this.roleService.create(dto);
  }
}
