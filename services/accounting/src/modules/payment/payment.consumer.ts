import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitConsumer } from '@fdgn/rabbitmq';

@Injectable()
export class PaymentConsumer extends RabbitConsumer<any> {
  constructor(protected configService: ConfigService) {
    super(PaymentConsumer.name, configService.get('accountingConsume.paymentProcessing') as any);
  }

  async process(sources: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
