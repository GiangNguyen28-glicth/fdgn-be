import { IBaseEntity } from '@fdgn/common';
import { BillingStatus } from '../common';

export interface IBilling extends IBaseEntity {
  order_id: number;

  buyer_id: number;

  buyer_name: string;

  total_price: number;

  status: BillingStatus;

  error: string;
}
