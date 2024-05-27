import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule, LogModule } from '@fdgn/common';
import { MongoDBModule } from '@fdgn/mongoose';
import { RabbitMQModule } from '@fdgn/rabbitmq';

import { AccountingIntegrationEventProvider, IntegrationEventHandlers } from './app';
import { AppController } from './app.controller';
import { BillingSchema, LogEventSchema, RepoProvider } from './infra';
@Module({
  imports: [
    CqrsModule,
    CommonModule,
    MongoDBModule,
    LogModule,
    RabbitMQModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'log_events',
        useFactory: () => {
          return LogEventSchema;
        },
      },
      {
        name: 'billings',
        useFactory: () => {
          return BillingSchema;
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [...IntegrationEventHandlers, ...RepoProvider, AccountingIntegrationEventProvider],
})
export class AppModule {}
