import { IEvent } from '@nestjs/cqrs';
import { OrderStatus } from '@fdgn/share-ecm';
import { OrderItemEntity } from '../../infra';

export class OrderStatusChangedToAwaitingValidationDomainEvent implements IEvent {
  public order_id: number;
  public order_status: OrderStatus;
  public created_by: number;
  public order_items: OrderItemEntity[];
  constructor(order_id: number, order_status: OrderStatus, created_by: number, order_items: OrderItemEntity[]) {
    this.order_id = order_id;
    this.order_status = order_status;
    this.order_items = order_items;
    this.created_by = created_by;
  }
}
