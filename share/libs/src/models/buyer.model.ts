import { IEntity } from '@fdgn/common';
import { IOrder } from './order.model';

export interface IBuyer extends IEntity {
  id: number;
  
  name: string;

  order: IOrder;
  
  holder_name: string;

  postal_code: string;

  number: string;

  exp_month: number;

  exp_year: number;

  cvc: string;
}
