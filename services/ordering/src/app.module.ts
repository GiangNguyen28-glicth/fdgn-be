import { Module } from '@nestjs/common';

import { CommonModule, LogModule } from '@fdgn/common';
import { TypeOrmSQLModule } from '@fdgn/typeorm';
import { RabbitMQModule } from '@fdgn/rabbitmq';

import { AppController } from './app.controller';
import { OrderItemModule, OrderModule } from './modules';

@Module({
  imports: [CommonModule, LogModule, TypeOrmSQLModule, RabbitMQModule, OrderModule, OrderItemModule],
  controllers: [AppController],
})
export class AppModule {}
