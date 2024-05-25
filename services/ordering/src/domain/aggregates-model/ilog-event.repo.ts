import { Repository } from 'typeorm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { LogEventEntity } from '../../infra';
export interface ILogEventRepo extends IBaseCurdTypeOrm<LogEventEntity, Repository<LogEventEntity>> {}
