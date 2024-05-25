import { OrderStockRejectedIntegrationEventHandler } from './changed-status-order-rejected-handling';
import { OrderStatusChangedToConfirmedStockIntegrationEventHandler } from './changed-status-order-to-confirmed-stock-handling';
import { OrderCreatedEventHandler } from './create-order-handling';
import { OrderPaymentSucceededIntegrationEventHandler } from './order-payment-succeeded-handling';

export * from './create-order-handling';

export const IntegrationEventHandlers = [
  OrderCreatedEventHandler,
  OrderStatusChangedToConfirmedStockIntegrationEventHandler,
  OrderPaymentSucceededIntegrationEventHandler,
  OrderStockRejectedIntegrationEventHandler,
];
