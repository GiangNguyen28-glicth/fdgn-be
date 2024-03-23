import { Module } from '@nestjs/common';

import { CommonModule } from '@fdgn/common';
import { MongoDBModule } from '@fdgn/mongoose';
import { RabbitMQModule } from '@fdgn/rabbitmq';
import { RedisClientModule } from '@fdgn/redis';

import { CategoryModule, ProductModule } from './modules';

@Module({
  imports: [CommonModule, RabbitMQModule, MongoDBModule, RedisClientModule, CategoryModule, ProductModule],
  controllers: [],
})
export class AppModule {}
