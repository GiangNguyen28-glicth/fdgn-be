import { TypeOrmSQLModule } from '@fdgn/typeorm';
import { Module } from '@nestjs/common';

import { CommonModule, LogModule } from '@fdgn/common';
import { RabbitMQModule } from '@fdgn/rabbitmq';

import { AppController } from './app.controller';
import { AuthModule, ResourceModule, RoleModule, ShopModule, UserModule } from './modules';

@Module({
  imports: [
    CommonModule,
    TypeOrmSQLModule,
    LogModule,
    RabbitMQModule,
    AuthModule,
    UserModule,
    RoleModule,
    ResourceModule,
    ShopModule
  ],
  controllers: [AppController],
})
export class AppModule {}
