import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeOrmRepo } from '@fdgn/typeorm';

import { REPO } from '../../common';
import { ILogEventRepo } from '../../domain';
import { LogEventEntity } from '../entities';

export class LogEventRepo extends TypeOrmRepo<LogEventEntity> implements ILogEventRepo {
  constructor(
    @InjectRepository(LogEventEntity)
    protected logEventRepo: Repository<LogEventEntity>,
  ) {
    super(logEventRepo);
  }
}
export const LogEventRepoProvider = {
  provide: REPO.LOG_EVENT,
  useClass: LogEventRepo,
};
