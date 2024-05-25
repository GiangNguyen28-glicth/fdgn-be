import { OrderStatus } from '@fdgn/share-ecm';

export class OrderStockItems {
  public product_id: string;
  public quantity: number;
}

export class OrderStatusChangedToAwaitingValidationIntegrationEvent {
  public order_id: number;
  public user_id: number;
  public order_status: OrderStatus;
  public order_stock_items: OrderStockItems[];
  constructor(order_id: number, user_id: number, order_status: OrderStatus, order_stock_items: OrderStockItems[]) {
    this.order_id = order_id;
    this.user_id = user_id;
    this.order_status = order_status;
    this.order_stock_items = order_stock_items;
  }
}
