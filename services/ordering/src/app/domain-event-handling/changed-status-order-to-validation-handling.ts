import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { OrderStatusChangedToAwaitingValidationDomainEvent } from '../../domain';
import {
  IOrderingIntegrationEventService,
  OrderStatusChangedToAwaitingValidationIntegrationEvent,
  OrderStockItems,
  OrderingIntegrationEventService,
} from '../integration-events';

@EventsHandler(OrderStatusChangedToAwaitingValidationDomainEvent)
export class OrderStatusChangedToAwaitingValidationDomainEventHandler
  implements IEventHandler<OrderStatusChangedToAwaitingValidationDomainEvent>
{
  constructor(
    @Inject(OrderingIntegrationEventService.name) private orderingIntegrationService: IOrderingIntegrationEventService,
  ) {}

  async handle(domain_event: OrderStatusChangedToAwaitingValidationDomainEvent) {
    console.log('OrderStatusChangedToAwaitingValidationDomainEventHandler');
    const order_stock_items: OrderStockItems[] = domain_event.order_items.map(order_item => {
      return { product_id: order_item.product_id, quantity: order_item.quantity };
    });
    const integration_event = new OrderStatusChangedToAwaitingValidationIntegrationEvent(
      domain_event.order_id,
      domain_event.created_by,
      domain_event.order_status,
      order_stock_items,
    );
    const evt_log = await this.orderingIntegrationService.addAndSaveEvent({
      context: OrderStatusChangedToAwaitingValidationDomainEventHandler.name,
      event_content: JSON.stringify(integration_event),
      event_name: OrderStatusChangedToAwaitingValidationIntegrationEvent.name,
      request_id: '1',
      transaction_id: '1',
    });
    await this.orderingIntegrationService.publishEventsThroughEventBus(evt_log.id);
  }
}
