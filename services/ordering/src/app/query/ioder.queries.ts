import { Order } from '../../domain';

export interface IOrdersQueries {
  getOrderByUser(): Promise<Order>;
}
