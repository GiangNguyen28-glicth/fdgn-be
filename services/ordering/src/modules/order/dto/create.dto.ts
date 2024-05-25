import { Order } from '../../../domain';
export class CreateOrderDTO implements Partial<Order> {
  created_by?: number;
}
