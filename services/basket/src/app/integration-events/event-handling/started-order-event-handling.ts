import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RabbitConsumer } from '@fdgn/rabbitmq';
import { RedisClientService } from '@fdgn/redis';
import { OrderStartedEvent } from '../events';

@Injectable()
export class OrderStartedEventHandler extends RabbitConsumer<OrderStartedEvent> {
  constructor(protected configService: ConfigService, private redisService: RedisClientService) {
    console.log(configService.get('basketConsume.cartDeleted'));
    super(OrderStartedEventHandler.name, configService.get('basketConsume.cartDeleted') as any);
  }
  process(sources: OrderStartedEvent): Promise<void> {
    console.log(sources);
    throw new Error('Method not implemented.');
  }
}
