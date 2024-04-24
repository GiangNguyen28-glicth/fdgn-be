import { Module } from '@nestjs/common';

import { CommonModule, LogModule } from '@fdgn/common';
import { RedisClientModule } from '@fdgn/redis';
import { RabbitMQModule } from '@fdgn/rabbitmq';
import { AppController } from './app.controller';
import { CartModule } from './modules';

@Module({
  imports: [CommonModule, RedisClientModule, LogModule, RabbitMQModule, CartModule],
  controllers: [AppController],
})
export class AppModule {}
