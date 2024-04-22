import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { TypeOrmRepo } from '@fdgn/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shop } from '../entities';

export const SHOP_PROVIDER = {
  TYPE_ORM_REPO: Shop.name.toUpperCase() + '_' + DBS_TYPE.TYPE_ORM,
};

export interface IShopRepo extends ICrudRepo<Shop> {}

export class ShopTypeOrmRepo extends TypeOrmRepo<Shop> {
  constructor(
    @InjectRepository(Shop)
    protected shopRepo: Repository<Shop>,
  ) {
    super(shopRepo);
  }
}
export const ShopTypeOrmProvider = {
  provide: SHOP_PROVIDER.TYPE_ORM_REPO,
  useClass: ShopTypeOrmRepo,
};
