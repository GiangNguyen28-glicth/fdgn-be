import { Module } from '@nestjs/common';
import { MongoDBModule } from '@fdgn/mongoose';
import { RabbitMQModule } from '@fdgn/rabbitmq';
import { CommonModule, LogModule } from '@fdgn/common';
import { AppController } from './app.controller';
import { PaymentModule } from './modules';
@Module({
  imports: [CommonModule, MongoDBModule, LogModule, RabbitMQModule, PaymentModule],
  controllers: [AppController],
})
export class AppModule {}
