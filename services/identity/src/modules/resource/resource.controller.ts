import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from '@fdgn/common';
import { Resource } from '@fdgn/share-domain';

import { ResourceService } from './resource.service';
import { CreateResourceDTO } from './dto';

@ApiTags(Resource.name)
@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Post()
  async create(@Body() dto: CreateResourceDTO): Promise<IResponse> {
    return await this.resourceService.create(dto);
  }
}
