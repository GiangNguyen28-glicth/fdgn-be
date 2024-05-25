import { IQueueProducerConfig, ProducerMode, RabbitMQService } from '@fdgn/rabbitmq';
import { DomainEventStatus } from '@fdgn/share-ecm';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvalidEventsHandlerException } from '@nestjs/cqrs';
import { LogEventEntity, LogEventRepo } from '../../infra';
import { REPO } from '../../common';
import { OrderStockConfirmedIntegrationEvent, OrderStockRejectedIntegrationEvent } from './events';

export class CreateLogEvent implements Partial<LogEventEntity> {
  transaction_id?: string;
  request_id?: string;
  event_content?: string;
  event_name?: string;
  context?: string;
}

export interface ICatalogIntegrationEventService {
  publishEventsThroughEventBus(evt_id: number | string): Promise<void>;
  addAndSaveEvent(entity: CreateLogEvent): Promise<LogEventEntity>;
}

@Injectable()
export class CatalogIntegrationEventService implements ICatalogIntegrationEventService {
  constructor(
    private rabbitService: RabbitMQService,
    @Inject(REPO.LOG_EVENT) private logEventRepo: LogEventRepo,
    private configService: ConfigService,
  ) {}

  getEventBusConfigByEventName(name: string): IQueueProducerConfig {
    switch (name) {
      case OrderStockConfirmedIntegrationEvent.name:
        return {
          mode: ProducerMode.Exchange,
          exchange: this.configService.get<string>('catalogProducer.orderConfirmedStock.exchange') || '',
          routingKey: this.configService.get<string>('catalogProducer.orderConfirmedStock.routingKey') || '',
        };
      case OrderStockRejectedIntegrationEvent.name:
        return {
          mode: ProducerMode.Exchange,
          exchange: this.configService.get<string>('catalogProducer.orderRejectedStock.exchange') || '',
          routingKey: this.configService.get<string>('catalogProducer.orderRejectedStock.routingKey') || '',
        };
      default:
        throw new InvalidEventsHandlerException();
    }
  }

  async publishEventsThroughEventBus(evt_id: string): Promise<void> {
    const evt_log = await this.logEventRepo.findOne({ filters: { _id: evt_id } });
    try {
      if (!evt_log) {
        await this.logEventRepo.update({ entity: { error: 'Event Not Found', status: DomainEventStatus.FAILED } });
        return;
      }
      evt_log.status = DomainEventStatus.INPROGRESS;
      await this.logEventRepo.save({ entity: evt_log });
      const config_bus = this.getEventBusConfigByEventName(evt_log.event_name);
      await this.rabbitService.publish({
        exchange: config_bus.exchange,
        msgs: [{ key: config_bus.routingKey, content: evt_log.event_content }],
      });
      evt_log.status = DomainEventStatus.SUCCESS;
      await this.logEventRepo.save({ entity: evt_log });
    } catch (error) {
      evt_log.error = error;
      evt_log.status = DomainEventStatus.FAILED;
      await this.logEventRepo.save({ entity: evt_log });
      throw error;
    }
  }

  async addAndSaveEvent(entity: CreateLogEvent): Promise<LogEventEntity> {
    try {
      const log_event = await this.logEventRepo.insert({ entity });
      await this.logEventRepo.save({ entity: log_event });
      return log_event;
    } catch (error) {
      throw error;
    }
  }
}

export const CatalogIntegrationEventProvider = {
  provide: CatalogIntegrationEventService.name,
  useClass: CatalogIntegrationEventService,
};
