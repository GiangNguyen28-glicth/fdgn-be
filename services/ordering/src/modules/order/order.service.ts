import { Inject, Injectable } from '@nestjs/common';

import { OrderStatus } from '@fdgn/share-ecm';
import { TypeOrmService } from '@fdgn/typeorm';

import { REPO } from '../../common';
import { IOrderRepo, Order } from '../../domain';
import { OrderItemService } from '../order-item';
import { IOrderCreated } from './messages';
import { OrderEntity } from '../../infra';

@Injectable()
export class OrderService {
  constructor(
    @Inject(REPO.ORDER) private orderRepo: IOrderRepo,
    private orderItemService: OrderItemService,
    private typeOrmService: TypeOrmService,
  ) {}

  async create(order_created: IOrderCreated): Promise<Order> {
    const query_runner = await this.typeOrmService.getConnection();
    try {
      const order = await this.orderRepo.insert({
        entity: {
          created_by: order_created.user_id,
          status: OrderStatus.AWAITING_VALIDATION,
          shipping_address: 'Mock Shipping Address',
        },
      });
      await this.orderRepo.save({ entity: order, session: query_runner });
      query_runner.commitTransaction();
      const { id, original_price, image_url, price, title } = order_created.products[0];
      const order_item = await this.orderItemService.create({
        product_image_url: image_url,
        sell_price: price,
        order,
        product_name: title,
        original_price,
        product_id: id,
        quantity: 1,
        total: 1,
      });
      //   order.order_items = [order_item];
      //   await this.orderRepo.save({ entity: order, session: query_runner });
      return order;
    } catch (error) {
      query_runner.rollbackTransaction();
      throw error;
    }
  }
}
