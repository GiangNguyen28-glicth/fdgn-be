import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@fdgn/rabbitmq';
import { CommonModule, LogModule } from '@fdgn/common';

import { MailModule } from './modules';

@Module({
  imports: [CommonModule, RabbitMQModule, LogModule, MailModule],
  controllers: [],
})
export class AppModule {}
