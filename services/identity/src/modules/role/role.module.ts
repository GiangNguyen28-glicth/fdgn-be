import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role, RoleTypeOrmProvider } from '@fdgn/share-domain';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleTypeOrmProvider, RoleService],
  exports: [RoleService]
})
export class RoleModule {}
