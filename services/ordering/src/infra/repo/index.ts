import { BuyerRepoProvider } from './buyer.repositories';
import { LogEventRepoProvider } from './log-event.repositories';
import { OrderItemRepoProvider } from './order-item.repositories';
import { OrderRepoProvider } from './order.repositories';

export * from './order-item.repositories';
export * from './order.repositories';
export * from './buyer.repositories';
export * from './log-event.repositories';

export const RepoProvider = [OrderRepoProvider, OrderItemRepoProvider, BuyerRepoProvider, LogEventRepoProvider];
