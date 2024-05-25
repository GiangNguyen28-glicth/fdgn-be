import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { OrderStatusChangedToPaidDomainEvent } from '../../domain';
import {
  IOrderingIntegrationEventService,
  OrderStatusChangedToPaidIntegrationEvent,
  OrderStockItems,
  OrderingIntegrationEventService,
} from '../integration-events';

@EventsHandler(OrderStatusChangedToPaidDomainEvent)
export class OrderStatusChangedToPaidDomainEventHandler implements IEventHandler<OrderStatusChangedToPaidDomainEvent> {
  constructor(
    @Inject(OrderingIntegrationEventService.name) private orderingIntegrationService: IOrderingIntegrationEventService,
  ) {}
  async handle(domain_event: OrderStatusChangedToPaidDomainEvent) {
    console.log('OrderStatusChangedToPaidDomainEventHandler');
    const order_stock_items: OrderStockItems[] = domain_event.order_items.map(order_item => {
      return { product_id: order_item.product_id, quantity: order_item.quantity };
    });
    const integration_event = new OrderStatusChangedToPaidIntegrationEvent(
      domain_event.order_id,
      domain_event.order_status,
      order_stock_items,
    );
    const evt_log = await this.orderingIntegrationService.addAndSaveEvent({
      context: OrderStatusChangedToPaidDomainEventHandler.name,
      event_content: JSON.stringify(integration_event),
      event_name: OrderStatusChangedToPaidIntegrationEvent.name,
      request_id: '1',
      transaction_id: '1',
    });
    await this.orderingIntegrationService.publishEventsThroughEventBus(evt_log.id);
  }
}
