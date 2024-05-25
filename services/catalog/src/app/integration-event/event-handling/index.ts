import { OrderStatusChangedToPaidIntegrationEventHandler } from './changed-status-oder-to-paid-event-handling';
import { OrderStatusChangedToAwaitingValidationIntegrationEventHandler } from './changed-status-order-to-validation-handling';

export * from './changed-status-order-to-validation-handling';

export const IntegrationEventHandlers = [
  OrderStatusChangedToAwaitingValidationIntegrationEventHandler,
  OrderStatusChangedToPaidIntegrationEventHandler,
];
