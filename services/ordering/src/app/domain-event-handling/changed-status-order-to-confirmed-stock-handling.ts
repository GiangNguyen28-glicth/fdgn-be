import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { IOrderRepo, OrderStatusChangedToStockConfirmedDomainEvent } from '../../domain';
import { REPO } from '../../common';
import {
  IOrderingIntegrationEventService,
  OrderStatusChangedToStockConfirmedIntegrationEvent,
  OrderingIntegrationEventService,
} from '../integration-events';

@EventsHandler(OrderStatusChangedToStockConfirmedDomainEvent)
export class OrderStatusChangedToStockConfirmedDomainEventHandler
  implements IEventHandler<OrderStatusChangedToStockConfirmedDomainEvent>
{
  constructor(
    @Inject(REPO.ORDER) private orderRepo: IOrderRepo,
    @Inject(OrderingIntegrationEventService.name) private orderingIntegrationService: IOrderingIntegrationEventService,
  ) {}
  async handle(event: OrderStatusChangedToStockConfirmedDomainEvent) {
    console.log('OrderStatusChangedToStockConfirmedDomainEventHandler');
    const order = await this.orderRepo.findOne({ filters: { id: event.order_id }, relations: ['buyer'] });
    const integration_event = new OrderStatusChangedToStockConfirmedIntegrationEvent(
      order.id,
      order.status,
      50000,
      order.buyer,
    );
    const evt_log = await this.orderingIntegrationService.addAndSaveEvent({
      context: OrderStatusChangedToStockConfirmedDomainEventHandler.name,
      event_content: JSON.stringify(integration_event),
      event_name: OrderStatusChangedToStockConfirmedIntegrationEvent.name,
      request_id: '1',
      transaction_id: '1',
    });
    await this.orderingIntegrationService.publishEventsThroughEventBus(evt_log.id);
  }
}
