import { Module, NestMiddleware } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { CommonModule, LogModule, toKeyword } from '@fdgn/common';
import { MongoDBModule } from '@fdgn/mongoose';
import { RabbitMQModule } from '@fdgn/rabbitmq';
import { RedisClientModule } from '@fdgn/redis';

import { CatalogIntegrationEventProvider, IntegrationEventHandlers, ModuleControllers, ModuleServices } from './app';
import { AppController } from './app.controller';
import { CategorySchema, LogEventSchema, ProductSchema, RepoProvider } from './infra';

@Module({
  imports: [
    CommonModule,
    RabbitMQModule,
    MongoDBModule,
    RedisClientModule,
    LogModule,
    PrometheusModule.register({ defaultMetrics: { enabled: true } }),
    MongooseModule.forFeatureAsync([
      {
        name: 'products',
        useFactory: () => {
          ProductSchema.pre('save', function (next) {
            this.keyword = toKeyword(this.title) + ' ' + this._id;
            this.slug = this.keyword.replace(/ /g, '-');
            return next();
          });
          return ProductSchema;
        },
      },
      {
        name: 'categories',
        useFactory: () => {
          CategorySchema.pre('save', function (next) {
            this.keyword = toKeyword(this.name) + ' ' + this._id;
            this.slug = this.keyword.replace(/ /g, '-');
            return next();
          });
          return CategorySchema;
        },
      },
      {
        name: 'log_events',
        useFactory: () => {
          return LogEventSchema;
        },
      },
    ]),
  ],
  controllers: [AppController, ...ModuleControllers],
  providers: [...RepoProvider, ...IntegrationEventHandlers, CatalogIntegrationEventProvider, ...ModuleServices],
})
export class AppModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error('Method not implemented.');
  }
}
