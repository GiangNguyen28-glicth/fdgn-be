import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitConsumer } from '@fdgn/rabbitmq';
import { CommandBus } from '@nestjs/cqrs';

import { OrderCreatedEvent } from '../events';
import { OrderCreatedCommand } from '../../command';

@Injectable()
export class OrderCreatedEventHandler extends RabbitConsumer<OrderCreatedEvent> {
  constructor(protected configService: ConfigService, private commandBus: CommandBus) {
    super(OrderCreatedEventHandler.name, configService.get('orderingConsumer.orderCreated') as any);
  }

  async process(sources: OrderCreatedEvent): Promise<void> {
    await this.commandBus.execute(new OrderCreatedCommand(sources));
  }
}
