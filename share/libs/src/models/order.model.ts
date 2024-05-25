import { IBaseEntity, IEntity } from '@fdgn/common';
import { OrderStatus } from '../common';
import { IOrderItem } from './order-item.model';
import { IBuyer } from './buyer.model';

export interface IOrder extends IBaseEntity {
  id: number;

  created_by: number;

  shipping_address: string;

  status: OrderStatus;

  order_items: IOrderItem[];

  buyer: IBuyer;
}
