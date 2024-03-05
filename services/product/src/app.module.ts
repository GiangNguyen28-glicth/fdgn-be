import { Module } from '@nestjs/common';

import { CommonModule } from '@fdgn/common';
import { MongoDBModule } from '@fdgn/mongoose';
import { RabbitMQCsModule } from '@fdgn/rabbitmq';

import { CategoryModule, ProductModule } from './modules';

const PRODUCT_SERVICE = 'PRODUCT_SERVICE';
@Module({
  imports: [CommonModule, RabbitMQCsModule.register(PRODUCT_SERVICE), MongoDBModule, CategoryModule, ProductModule],
  controllers: [],
})
export class AppModule {}
