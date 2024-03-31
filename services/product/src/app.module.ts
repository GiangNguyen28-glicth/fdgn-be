import { Module } from '@nestjs/common';

import { CommonModule, LogModule } from '@fdgn/common';
import { MongoDBModule } from '@fdgn/mongoose';
import { RabbitMQModule } from '@fdgn/rabbitmq';
import { RedisClientModule } from '@fdgn/redis';

import { CategoryModule, ProductModule } from './modules';
import { AppController } from './app.controller';

@Module({
  imports: [CommonModule, RabbitMQModule, MongoDBModule, RedisClientModule, LogModule, CategoryModule, ProductModule],
  controllers: [AppController],
})
export class AppModule {}
