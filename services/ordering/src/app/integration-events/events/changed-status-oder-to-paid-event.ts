import { OrderStatus } from '@fdgn/share-ecm';
import { OrderStockItems } from './changed-status-order-to-validation-event';

export class OrderStatusChangedToPaidIntegrationEvent {
  public order_id: number;
  public order_status: OrderStatus;
  public order_stock_items: OrderStockItems[];
  constructor(order_id: number, order_status: OrderStatus, order_stock_items: OrderStockItems[]) {
    this.order_id = order_id;
    this.order_status = order_status;
    this.order_stock_items = order_stock_items;
  }
}
