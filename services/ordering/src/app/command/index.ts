import { OrderCreatedCommandHandler } from './create-order-cmd.handler';
import { SetAwaitingValidationOrderStatusCommandHandler } from './set-awaiting-order-status-cmd.handler';
import { SetStockConfirmedOrderStatusCommandHandler } from './set-confirmed-stock-cmd.handler';
import { SetPaidOrderStatusCommandHandler } from './set-paid-order-status-cmd.handler';
import { SetStockRejectedOrderStatusCommandHandler } from './set-rejected-stock-cmd.handler';

export * from './create-order-cmd';
export * from './create-order-cmd.handler';
export * from './set-awaiting-order-status-cmd';
export * from './set-awaiting-order-status-cmd.handler';
export * from './set-confirmed-stock.cmd';
export * from './set-confirmed-stock-cmd.handler';
export * from './set-paid-order-status-cmd';
export * from './set-paid-order-status-cmd.handler';
export * from './set-rejected-stock.cmd';
export * from './set-rejected-stock-cmd.handler';
export const CommandHandlers = [
  OrderCreatedCommandHandler,
  SetAwaitingValidationOrderStatusCommandHandler,
  SetStockConfirmedOrderStatusCommandHandler,
  SetPaidOrderStatusCommandHandler,
  SetStockRejectedOrderStatusCommandHandler,
];
