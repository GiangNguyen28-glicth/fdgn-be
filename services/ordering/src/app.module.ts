import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule, LogModule } from '@fdgn/common';
import { RabbitMQModule } from '@fdgn/rabbitmq';
import { TypeOrmSQLModule } from '@fdgn/typeorm';

import { CqrsModule } from '@nestjs/cqrs';
import {
  CommandHandlers,
  DomainEventHandlers,
  IntegrationEventHandlers,
  OrderingIntegrationEventProvider
} from './app';
import { AppController } from './app.controller';
import { Entities, RepoProvider } from './infra';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    LogModule,
    TypeOrmSQLModule,
    RabbitMQModule,
    TypeOrmModule.forFeature([...Entities]),
  ],
  controllers: [AppController],
  providers: [
    ...RepoProvider,
    ...CommandHandlers,
    ...DomainEventHandlers,
    ...IntegrationEventHandlers,
    OrderingIntegrationEventProvider,
  ],
})
export class AppModule {}
