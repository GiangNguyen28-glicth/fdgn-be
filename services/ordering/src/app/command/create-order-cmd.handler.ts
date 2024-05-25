import { Inject } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TypeOrmService } from '@fdgn/typeorm';

import { REPO } from '../../common';
import { IBuyerRepo, IOrderItemRepo, IOrderRepo } from '../../domain';
import {
  IOrderingIntegrationEventService,
  OrderStartedEvent,
  OrderingIntegrationEventService,
} from '../integration-events';
import { OrderCreatedCommand } from './create-order-cmd';
import { SetAwaitingValidationOrderStatusCommand } from './set-awaiting-order-status-cmd';

@CommandHandler(OrderCreatedCommand)
export class OrderCreatedCommandHandler implements ICommandHandler<OrderCreatedCommand> {
  constructor(
    @Inject(REPO.ORDER) private orderRepo: IOrderRepo,
    @Inject(REPO.ORDER_ITEM) private orderItemRepo: IOrderItemRepo,
    @Inject(REPO.BUYER) private buyerRepo: IBuyerRepo,
    @Inject(OrderingIntegrationEventService.name) private orderingIntegrationService: IOrderingIntegrationEventService,
    private typeOrmService: TypeOrmService,
    private commandBus: CommandBus,
  ) {}

  async execute(message: OrderCreatedCommand) {
    const query_runner = await this.typeOrmService.getConnection();
    try {
      const order = await this.orderRepo.insert({
        entity: {
          created_by: message.user_id,
          shipping_address: 'Mock Shipping Address',
        },
      });
      const { id, original_price, image_url, price, title, quantity } = message.products[0];
      const order_item = await this.orderItemRepo.insert({
        entity: {
          product_image_url: image_url,
          sell_price: price,
          product_name: title,
          original_price,
          product_id: id,
          quantity,
          total: 1,
        },
        session: query_runner,
      });
      const { cvc, exp_month, holder_name, postal_code, number, exp_year } = message.card;
      const buyer = await this.buyerRepo.insert({
        entity: { holder_name, postal_code, cvc, exp_month, number, name: message.user_name, exp_year },
        session: query_runner,
      });
      order.order_items = [order_item];
      await this.buyerRepo.save({ entity: buyer, session: query_runner });
      order.buyer = buyer;
      await this.orderRepo.save({ entity: order, session: query_runner });
      order_item.order = order;
      buyer.order = order;
      await this.orderItemRepo.save({ entity: order_item, session: query_runner });
      await this.buyerRepo.save({ entity: buyer, session: query_runner });
      query_runner.commitTransaction();
      const order_started_event = new OrderStartedEvent(message.user_id);
      const evt_log = await this.orderingIntegrationService.addAndSaveEvent({
        context: OrderCreatedCommandHandler.name,
        event_content: JSON.stringify(order_started_event),
        event_name: OrderStartedEvent.name,
        request_id: '1',
        transaction_id: '1',
      });
      await this.orderingIntegrationService.publishEventsThroughEventBus(evt_log.id);
      await this.commandBus.execute(new SetAwaitingValidationOrderStatusCommand(order.id));
      return order;
    } catch (error) {
      query_runner.rollbackTransaction();
      query_runner.release();
      throw error;
    } finally {
      query_runner.release();
    }
  }
}
