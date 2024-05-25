import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeOrmRepo } from '@fdgn/typeorm';

import { REPO } from '../../common';
import { IBuyerRepo } from '../../domain';
import { BuyerEntity } from '../entities';

export class BuyerRepo extends TypeOrmRepo<BuyerEntity> implements IBuyerRepo {
  constructor(
    @InjectRepository(BuyerEntity)
    protected orderRepo: Repository<BuyerEntity>,
  ) {
    super(orderRepo);
  }
}
export const BuyerRepoProvider = {
  provide: REPO.BUYER,
  useClass: BuyerRepo,
};
