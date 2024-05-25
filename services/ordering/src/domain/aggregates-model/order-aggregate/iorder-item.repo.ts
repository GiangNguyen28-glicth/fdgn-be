import { Repository } from 'typeorm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { OrderItemEntity } from '../../../infra';

export interface IOrderItemRepo extends IBaseCurdTypeOrm<OrderItemEntity, Repository<OrderItemEntity>> {}
