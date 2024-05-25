import { OrderStockItems } from './changed-status-order-to-validation-event';

export class OrderStockRejectedIntegrationEvent {
  public order_id: number;
  public order_stock_items: OrderStockItems[];
  constructor(order_id: number, order_stock_items: OrderStockItems[]) {
    this.order_id = order_id;
    this.order_stock_items = order_stock_items;
  }
}
