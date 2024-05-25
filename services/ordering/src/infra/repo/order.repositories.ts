import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeOrmRepo } from '@fdgn/typeorm';

import { REPO } from '../../common';
import { IOrderRepo } from '../../domain';
import { OrderEntity } from '../entities';

export class OrderRepo extends TypeOrmRepo<OrderEntity> implements IOrderRepo {
  constructor(
    @InjectRepository(OrderEntity)
    protected orderRepo: Repository<OrderEntity>,
  ) {
    super(orderRepo);
  }
}
export const OrderRepoProvider = {
  provide: REPO.ORDER,
  useClass: OrderRepo,
};
