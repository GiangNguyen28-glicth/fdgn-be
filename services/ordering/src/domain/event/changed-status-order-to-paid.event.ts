import { OrderStatus } from '@fdgn/share-ecm';
import { OrderItemEntity } from '../../infra';

export class OrderStatusChangedToPaidDomainEvent {
  public order_id: number;
  public order_status: OrderStatus;
  public order_items: OrderItemEntity[];
  constructor(order_id: number, order_status: OrderStatus, order_items: OrderItemEntity[]) {
    this.order_id = order_id;
    this.order_status = order_status;
    this.order_items = order_items;
  }
}
