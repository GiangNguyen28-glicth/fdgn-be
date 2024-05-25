import { TypeOrmRepo } from '@fdgn/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { REPO } from '../../common';
import { IOrderItemRepo } from '../../domain';
import { OrderItemEntity } from '../entities';

export class OrderItemRepo extends TypeOrmRepo<OrderItemEntity> implements IOrderItemRepo {
  constructor(
    @InjectRepository(OrderItemEntity)
    protected orderItemRepo: Repository<OrderItemEntity>,
  ) {
    super(orderItemRepo);
  }
}
export const OrderItemRepoProvider = {
  provide: REPO.ORDER_ITEM,
  useClass: OrderItemRepo,
};
