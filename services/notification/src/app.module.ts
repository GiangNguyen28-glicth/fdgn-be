import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@fdgn/rabbitmq';
import { MongoDBModule } from '@fdgn/mongoose';
import { CommonModule, LogModule } from '@fdgn/common';

import { MailModule, NotificationModule } from './modules';
import { AppController } from './app.controller';

@Module({
  imports: [CommonModule, RabbitMQModule, MongoDBModule, LogModule, MailModule, NotificationModule],
  controllers: [AppController],
})
export class AppModule {}
