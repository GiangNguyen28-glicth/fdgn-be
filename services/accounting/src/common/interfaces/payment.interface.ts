import { OrderStatusChangedToStockConfirmedIntegrationEvent } from '../../app';

export interface IPaymentStrategy {
  createPayment(event: OrderStatusChangedToStockConfirmedIntegrationEvent): Promise<any>;
}
