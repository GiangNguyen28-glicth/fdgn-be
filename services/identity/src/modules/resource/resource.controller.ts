import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from '@fdgn/common';
import { Permission, RolesGuard, hasResource, hasRoles, RoleType } from '@fdgn/share-ecm';

import { ResourceService } from './resource.service';
import { CreateResourceDTO } from './dto';

@ApiTags('Resource')
@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  @hasRoles([RoleType.ADMIN])
  @hasResource([Permission.READ_ANY])
  @UseGuards(RolesGuard)
  async findAll(): Promise<any> {
    return await this.resourceService.findAll();
  }
  
  @Post()
  async create(@Body() dto: CreateResourceDTO): Promise<IResponse> {
    return await this.resourceService.create(dto);
  }
}
