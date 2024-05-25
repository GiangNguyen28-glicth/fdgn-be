import { IOrder, OrderStatus } from '@fdgn/share-ecm';
import { AggregateRoot } from '@nestjs/cqrs';
import { BuyerEntity, OrderItemEntity } from '../../../infra';
import {
  OrderStatusChangedToAwaitingValidationDomainEvent,
  OrderStatusChangedToPaidDomainEvent,
  OrderStatusChangedToStockConfirmedDomainEvent,
} from '../../event';
export class Order extends AggregateRoot implements IOrder {
  id: number;
  created_by: number;
  shipping_address: string;
  status: OrderStatus;
  order_items: OrderItemEntity[];
  buyer: BuyerEntity;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;

  setAwaitingValidationStatus() {
    if (this.status === OrderStatus.SUBMITTED) {
      this.status = OrderStatus.AWAITING_VALIDATION;
      this.apply(
        new OrderStatusChangedToAwaitingValidationDomainEvent(this.id, this.status, this.created_by, this.order_items),
      );
    }
  }

  setStockConfirmedStatus(): void {
    if (this.status == OrderStatus.AWAITING_VALIDATION) {
      this.status = OrderStatus.STOCK_CONFIRMED;
      this.apply(new OrderStatusChangedToStockConfirmedDomainEvent(this.id));
    }
  }

  setPaidStatus(): void {
    if (this.status === OrderStatus.STOCK_CONFIRMED) {
      this.status = OrderStatus.PAID;
      this.apply(new OrderStatusChangedToPaidDomainEvent(this.id, this.status, this.order_items));
    }
  }

  setCancelledStatusWhenStockIsRejected(): void {
    if (this.status === OrderStatus.AWAITING_VALIDATION) {
      this.status = OrderStatus.CANCEL;
    }
  }
}
