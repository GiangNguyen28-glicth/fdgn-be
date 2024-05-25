import { TypeOrmService } from '@fdgn/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { REPO } from '../../common';
import { CreateOrderItemDTO } from './dto';
import { IOrderItemRepo } from '../../domain';
import { OrderItemEntity } from '../../infra';

@Injectable()
export class OrderItemService {
  constructor(@Inject(REPO.ORDER_ITEM) private orderItemRepo: IOrderItemRepo, private typeOrmService: TypeOrmService) {}

  async create(dto: CreateOrderItemDTO): Promise<OrderItemEntity> {
    const query_runner = await this.typeOrmService.getConnection();
    try {
      const order_item = await this.orderItemRepo.insert({ entity: dto, session: query_runner });
      await this.orderItemRepo.save({ entity: order_item, session: query_runner });
      query_runner.commitTransaction();
      return order_item;
    } catch (error) {
      query_runner.rollbackTransaction();
      throw error;
    }
  }
}
