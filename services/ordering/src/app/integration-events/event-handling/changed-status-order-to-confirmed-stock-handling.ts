import { RabbitConsumer } from '@fdgn/rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';

import { SetStockConfirmedOrderStatusCommand } from '../../command';
import { OrderStockConfirmedIntegrationEvent } from '../events';

@Injectable()
export class OrderStatusChangedToConfirmedStockIntegrationEventHandler extends RabbitConsumer<OrderStockConfirmedIntegrationEvent> {
  constructor(protected configService: ConfigService, private commandBus: CommandBus) {
    super(
      OrderStatusChangedToConfirmedStockIntegrationEventHandler.name,
      configService.get('orderingConsumer.orderConfirmedStock') as any,
    );
  }

  async process(source: OrderStockConfirmedIntegrationEvent): Promise<void> {
    console.log('OrderStatusChangedToConfirmedStockIntegrationEventHandler');
    await this.commandBus.execute(new SetStockConfirmedOrderStatusCommand(source.order_id));
  }
}
