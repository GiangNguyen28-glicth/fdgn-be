import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RabbitConsumer } from '@fdgn/rabbitmq';

import { REPO } from '../../../common';
import { IProductRepo } from '../../../domain';
import {
  OrderStatusChangedToAwaitingValidationIntegrationEvent,
  OrderStockConfirmedIntegrationEvent,
  OrderStockRejectedIntegrationEvent,
} from '../events';
import { CatalogIntegrationEventService, ICatalogIntegrationEventService } from '../catalog-integration.service';

@Injectable()
export class OrderStatusChangedToAwaitingValidationIntegrationEventHandler extends RabbitConsumer<OrderStatusChangedToAwaitingValidationIntegrationEvent> {
  constructor(
    protected configService: ConfigService,
    @Inject(REPO.PRODUCT)
    private productRepo: IProductRepo,
    @Inject(CatalogIntegrationEventService.name) private catalogIntegrationService: ICatalogIntegrationEventService,
  ) {
    super(
      OrderStatusChangedToAwaitingValidationIntegrationEventHandler.name,
      configService.get('catalogConsumer.productValidationStock') as any,
    );
  }
  async process(source: OrderStatusChangedToAwaitingValidationIntegrationEvent): Promise<void> {
    try {
      const ids: string[] = source.order_stock_items.map(item => item.product_id);
      const products = await this.productRepo.findAll({ filters: { _id: { $in: ids } }, fields: ['_id', 'quantity'] });
      const is_invalid_stock = products.some(product => {
        return source.order_stock_items.some(order_stock_item => {
          if (order_stock_item.product_id === product._id.toString() && order_stock_item.quantity > product.quantity) {
            return true;
          }
          return false;
        });
      });
      const order_stock_event = is_invalid_stock
        ? new OrderStockRejectedIntegrationEvent(source.order_id, source.order_stock_items)
        : new OrderStockConfirmedIntegrationEvent(source.order_id);

      const evt_log = await this.catalogIntegrationService.addAndSaveEvent({
        context: OrderStatusChangedToAwaitingValidationIntegrationEventHandler.name,
        event_content: JSON.stringify(order_stock_event),
        event_name: is_invalid_stock
          ? OrderStockRejectedIntegrationEvent.name
          : OrderStockConfirmedIntegrationEvent.name,
        request_id: '1',
        transaction_id: '1',
      });

      await this.catalogIntegrationService.publishEventsThroughEventBus(evt_log._id);
    } catch (error) {
      throw error;
    }
  }
}
