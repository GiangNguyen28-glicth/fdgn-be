import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitConsumer } from '@fdgn/rabbitmq';

@Injectable()
export class NotificationConsumer extends RabbitConsumer<any> {
  constructor(protected configService: ConfigService) {
    super(NotificationConsumer.name, configService.get('orderConsume.orderProcessing') as any);
  }

  async process(sources: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
