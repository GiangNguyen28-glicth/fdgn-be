import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleModule } from '../role';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { ResourceEntity, ResourceRepoProvider } from '../../infra';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity]), RoleModule],
  controllers: [ResourceController],
  providers: [ResourceRepoProvider, ResourceService],
})
export class ResourceModule {}
