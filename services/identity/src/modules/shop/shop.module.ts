import { Shop, ShopTypeOrmProvider } from '@fdgn/share-domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { UserModule } from '../user';
import { RoleModule } from '../role';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UserModule, RoleModule],
  controllers: [ShopController],
  providers: [ShopTypeOrmProvider, ShopService],
})
export class ShopModule {}
