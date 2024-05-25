import { RabbitConsumer } from '@fdgn/rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';

import { SetStockRejectedOrderStatusCommand } from '../../command';
import { OrderStockRejectedIntegrationEvent } from '../events';

@Injectable()
export class OrderStockRejectedIntegrationEventHandler extends RabbitConsumer<OrderStockRejectedIntegrationEvent> {
  constructor(protected configService: ConfigService, private commandBus: CommandBus) {
    super(
      OrderStockRejectedIntegrationEventHandler.name,
      configService.get('orderingConsumer.orderRejectedStock') as any,
    );
  }

  async process(source: OrderStockRejectedIntegrationEvent): Promise<void> {
    console.log('OrderStockRejectedIntegrationEventHandler');
    await this.commandBus.execute(new SetStockRejectedOrderStatusCommand(source.order_id, source.order_stock_items));
  }
}
