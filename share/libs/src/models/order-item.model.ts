import { IBaseEntity } from '@fdgn/common';
import { IOrder } from './order.model';

export interface IOrderItem extends IBaseEntity {
  id: number;

  original_price: number;

  sell_price: number;

  product_id: string;

  product_name: string;

  product_image_url: string;

  quantity: number;

  total: number;

  order: IOrder;
}
