import { IPaymentStrategy } from '../interfaces';
import { OrderStatusChangedToStockConfirmedIntegrationEvent } from '../../app';

export class PaymentContext {
  private _strategy: IPaymentStrategy;

  set strategy(strategy: IPaymentStrategy) {
    this._strategy = strategy;
  }

  public async executeStrategy<T>(event: OrderStatusChangedToStockConfirmedIntegrationEvent): Promise<T> {
    return await this._strategy.createPayment(event);
  }
}
