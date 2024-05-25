import { CateRepoProvider } from './cate.repositories';
import { LogEventRepoProvider } from './log-event.repositories';
import { ProductRepoProvider } from './product.repositories';

export * from './cate.repositories';
export * from './product.repositories';
export * from './log-event.repositories';

export const RepoProvider = [ProductRepoProvider, CateRepoProvider, LogEventRepoProvider];
