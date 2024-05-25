import { BillingRepoProvider } from './billing.repositories';
import { LogEventRepoProvider } from './log-event.repositories';

export * from './log-event.repositories';
export const RepoProvider = [LogEventRepoProvider, BillingRepoProvider];
