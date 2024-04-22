import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitConsumer } from '@fdgn/rabbitmq';

@Injectable()
export class OrderCreatedConsumer extends RabbitConsumer<any> {
  constructor(protected configService: ConfigService) {
    super(OrderCreatedConsumer.name, configService.get('orderingConsume.order') as any);
  }
  async process(sources: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
