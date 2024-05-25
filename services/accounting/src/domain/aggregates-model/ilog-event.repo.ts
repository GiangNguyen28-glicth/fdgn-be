import { IBaseCurdMongo } from '@fdgn/mongoose';
import { LogEventEntity, LogEventModel } from '../../infra';

export interface ILogEventRepo extends IBaseCurdMongo<LogEventEntity, LogEventModel> {}
