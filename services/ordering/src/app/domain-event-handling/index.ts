import { OrderStatusChangedToPaidDomainEventHandler } from './changed-status-order-to-paied-handling';
import { OrderStatusChangedToStockConfirmedDomainEventHandler } from './changed-status-order-to-confirmed-stock-handling';
import { OrderStatusChangedToAwaitingValidationDomainEventHandler } from './changed-status-order-to-validation-handling';

export * from './changed-status-order-to-validation-handling';

export const DomainEventHandlers = [
  OrderStatusChangedToAwaitingValidationDomainEventHandler,
  OrderStatusChangedToStockConfirmedDomainEventHandler,
  OrderStatusChangedToPaidDomainEventHandler,
];
