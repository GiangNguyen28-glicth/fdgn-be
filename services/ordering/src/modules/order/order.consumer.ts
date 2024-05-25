import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitConsumer } from '@fdgn/rabbitmq';
import { IOrderCreated } from './messages';
import { OrderService } from './order.service';

@Injectable()
export class OrderCreatedConsumer extends RabbitConsumer<IOrderCreated> {
  constructor(protected configService: ConfigService, private orderService: OrderService) {
    super(OrderCreatedConsumer.name, configService.get('orderingConsume.orderCreated') as any);
  }

  async process(sources: IOrderCreated): Promise<void> {
    const order = await this.orderService.create(sources);
    console.log(JSON.stringify(order));
  }
}
