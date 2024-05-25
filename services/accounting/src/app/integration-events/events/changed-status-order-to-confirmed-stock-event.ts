import { IBuyer, OrderStatus } from '@fdgn/share-ecm';

export class OrderStatusChangedToStockConfirmedIntegrationEvent {
  public order_id: number;
  public order_status: OrderStatus;
  public total_price: number;
  public buyer: IBuyer;
  constructor(order_id: number, order_status: OrderStatus, total_price: number, buyer: IBuyer) {
    this.order_id = order_id;
    this.order_status = order_status;
    this.total_price = total_price;
    this.buyer = buyer;
  }
}
