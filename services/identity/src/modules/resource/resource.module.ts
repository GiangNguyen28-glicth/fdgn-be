import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resource, ResourceTypeOrmProvider } from '@fdgn/share-domain';
import { RoleModule } from '../role';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), RoleModule],
  controllers: [ResourceController],
  providers: [ResourceTypeOrmProvider, ResourceService],
})
export class ResourceModule {}
