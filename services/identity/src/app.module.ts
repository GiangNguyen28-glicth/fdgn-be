import { MongoDBModule } from '@fdgn/mongoose';
import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@fdgn/rabbitmq';
import { CommonModule, LogModule } from '@fdgn/common';

import { AuthModule, ResourceModule, RoleModule, UserModule } from './modules';
import { AppController } from './app.controller';

@Module({
  imports: [CommonModule, MongoDBModule, UserModule, ResourceModule, RoleModule, LogModule, RabbitMQModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
