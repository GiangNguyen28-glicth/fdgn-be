import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { TypeOrmRepo } from '@fdgn/typeorm';
import { OrderItem } from '../entities';

export const ORDER_ITEM_PROVIDER = {
  TYPE_ORM_REPO: OrderItem.name.toUpperCase() + '_' + DBS_TYPE.TYPE_ORM,
};

export interface IOrderItemRepo extends ICrudRepo<OrderItem> {}

export class OrderItemTypeOrmRepo extends TypeOrmRepo<OrderItem> {
  constructor(
    @InjectRepository(OrderItem)
    protected orderItemRepo: Repository<OrderItem>,
  ) {
    super(orderItemRepo);
  }
}
export const OrderItemTypeOrmProvider = {
  provide: ORDER_ITEM_PROVIDER.TYPE_ORM_REPO,
  useClass: OrderItemTypeOrmRepo,
};
