import { Order } from '../../../domain';
import { OrderEntity, OrderItemEntity } from '../../../infra';
export class CreateOrderItemDTO implements Partial<OrderItemEntity> {
  original_price?: number;
  sell_price?: number;
  product_image_url?: string;
  product_id?: string;
  product_name?: string;
  quantity?: number;
  total?: number;
  order?: OrderEntity;
}
