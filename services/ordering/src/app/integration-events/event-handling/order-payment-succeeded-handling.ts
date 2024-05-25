import { RabbitConsumer } from '@fdgn/rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';

import { SetPaidOrderStatusCommand } from '../../command';
import { OrderPaymentSucceededIntegrationEvent } from '../events';

@Injectable()
export class OrderPaymentSucceededIntegrationEventHandler extends RabbitConsumer<OrderPaymentSucceededIntegrationEvent> {
  constructor(protected configService: ConfigService, private commandBus: CommandBus) {
    super(OrderPaymentSucceededIntegrationEventHandler.name, configService.get('orderingConsumer.orderConfirmedPayment') as any);
  } 

  async process(source: OrderPaymentSucceededIntegrationEvent): Promise<void> {
    console.log('OrderPaymentSucceededIntegrationEventHandler')
    await this.commandBus.execute(new SetPaidOrderStatusCommand(source.order_id));
  }
}
