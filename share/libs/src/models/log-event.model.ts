import { IBaseEntity, ISoftDelete } from '@fdgn/common';
import { DomainEventStatus } from '../common';

export interface ILogEvent extends Omit<IBaseEntity, keyof ISoftDelete> {
  request_id: string;

  transaction_id: string;

  event_name: string;

  event_content: string;

  context: string;

  status: DomainEventStatus;

  error?: string;
}
