import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { TypeOrmRepo } from '@fdgn/typeorm';
import { Order } from '../entities';


export const ORDER_PROVIDER = {
  TYPE_ORM_REPO: Order.name.toUpperCase() + '_' + DBS_TYPE.TYPE_ORM,
};

export interface IOrderRepo extends ICrudRepo<Order> {}

export class OrderTypeOrmRepo extends TypeOrmRepo<Order> {
  constructor(
    @InjectRepository(Order)
    protected orderRepo: Repository<Order>,
  ) {
    super(orderRepo);
  }
}
export const OrderTypeOrmProvider = {
  provide: ORDER_PROVIDER.TYPE_ORM_REPO,
  useClass: OrderTypeOrmRepo,
};
