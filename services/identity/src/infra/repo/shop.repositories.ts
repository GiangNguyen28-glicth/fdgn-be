import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeOrmRepo } from '@fdgn/typeorm';
import { REPO } from '../../common';
import { IShopRepo } from '../../domain';
import { ShopEntity } from '../entities';

export class ShopRepo extends TypeOrmRepo<ShopEntity> implements IShopRepo {
  constructor(
    @InjectRepository(ShopEntity)
    protected shopRepo: Repository<ShopEntity>,
  ) {
    super(shopRepo);
  }
}
export const ShopRepoProvider = {
  provide: REPO.SHOP,
  useClass: ShopRepo,
};
