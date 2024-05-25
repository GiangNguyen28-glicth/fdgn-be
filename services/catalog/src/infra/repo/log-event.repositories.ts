import { InjectModel } from '@nestjs/mongoose';

import { MongoRepo } from '@fdgn/mongoose';

import { REPO } from '../../common';
import { ILogEventRepo } from '../../domain';
import { LogEventEntity, LogEventModel } from '../entities';

export class LogEventRepo extends MongoRepo<LogEventEntity> implements ILogEventRepo {
  constructor(
    @InjectModel('log_events')
    protected logEventModel: LogEventModel,
  ) {
    super(logEventModel);
  }
}

export const LogEventRepoProvider = {
  provide: REPO.LOG_EVENT,
  useClass: LogEventRepo,
};
