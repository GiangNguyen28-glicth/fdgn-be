import { Repository } from 'typeorm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { Order } from './order.aggregate';
import { OrderEntity } from '../../../infra';
export interface IOrderRepo extends IBaseCurdTypeOrm<Order, Repository<OrderEntity>> {}
