import { IQueueProducerConfig, ProducerMode, RabbitMQService } from '@fdgn/rabbitmq';
import { DomainEventStatus } from '@fdgn/share-ecm';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvalidEventsHandlerException } from '@nestjs/cqrs';
import { LogEventEntity, LogEventRepo } from '../../infra';
import {
  OrderStartedEvent,
  OrderStatusChangedToAwaitingValidationIntegrationEvent,
  OrderStatusChangedToPaidIntegrationEvent,
  OrderStatusChangedToStockConfirmedIntegrationEvent,
} from './events';
import { REPO } from '../../common';

export class CreateLogEvent implements Partial<LogEventEntity> {
  transaction_id?: string;
  request_id?: string;
  event_content?: string;
  event_name?: string;
  context?: string;
}

export interface IOrderingIntegrationEventService {
  publishEventsThroughEventBus(evt_id: number | string): Promise<void>;
  addAndSaveEvent(entity: CreateLogEvent): Promise<LogEventEntity>;
}

@Injectable()
export class OrderingIntegrationEventService implements IOrderingIntegrationEventService {
  constructor(
    private rabbitService: RabbitMQService,
    @Inject(REPO.LOG_EVENT) private logEventRepo: LogEventRepo,
    private configService: ConfigService,
  ) {}

  getEventBusConfigByEventName(name: string): IQueueProducerConfig {
    switch (name) {
      case OrderStartedEvent.name:
        return {
          mode: ProducerMode.Exchange,
          exchange: this.configService.get<string>('orderingProducer.cartDeleted.exchange') || '',
          routingKey: this.configService.get<string>('orderingProducer.cartDeleted.routingKey') || '',
        };
      case OrderStatusChangedToAwaitingValidationIntegrationEvent.name:
        return {
          mode: ProducerMode.Exchange,
          exchange: this.configService.get<string>('orderingProducer.productValidationStock.exchange') || '',
          routingKey: this.configService.get<string>('orderingProducer.productValidationStock.routingKey') || '',
        };
      case OrderStatusChangedToStockConfirmedIntegrationEvent.name:
        return {
          mode: ProducerMode.Exchange,
          exchange: this.configService.get<string>('orderingProducer.paymentCheckoutOrder.exchange') || '',
          routingKey: this.configService.get<string>('orderingProducer.paymentCheckoutOrder.routingKey') || '',
        };
      case OrderStatusChangedToPaidIntegrationEvent.name:
        return {
          mode: ProducerMode.Exchange,
          exchange: this.configService.get<string>('orderingProducer.productSubtractStock.exchange') || '',
          routingKey: this.configService.get<string>('orderingProducer.productSubtractStock.routingKey') || '',
        };
      default:
        throw new InvalidEventsHandlerException();
    }
  }

  async publishEventsThroughEventBus(evt_id: number): Promise<void> {
    const evt_log = await this.logEventRepo.findOne({ filters: { id: evt_id } });
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

export const OrderingIntegrationEventProvider = {
  provide: OrderingIntegrationEventService.name,
  useClass: OrderingIntegrationEventService,
};
