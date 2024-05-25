import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ShopEntity, ShopRepoProvider } from '../../infra';
import { RoleModule } from '../role';
import { UserModule } from '../user';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity]), UserModule, RoleModule],
  controllers: [ShopController],
  providers: [ShopRepoProvider, ShopService],
})
export class ShopModule {}
