import { Controller, Body, Post } from '@nestjs/common';
import { IResponse } from '@fdgn/common';
import { ResourceService } from './resource.service';
import { CreateResourceDTO } from './dto';
@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Post()
  async create(@Body() dto: CreateResourceDTO): Promise<IResponse> {
    return await this.resourceService.create(dto);
  }
}
