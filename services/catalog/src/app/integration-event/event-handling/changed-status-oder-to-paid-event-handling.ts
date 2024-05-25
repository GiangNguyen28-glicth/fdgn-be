import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RabbitConsumer } from '@fdgn/rabbitmq';
import { sleep } from '@fdgn/common';

import { REPO } from '../../../common';
import { IProductRepo } from '../../../domain';
import { OrderStatusChangedToPaidIntegrationEvent } from '../events';
import { CatalogIntegrationEventService, ICatalogIntegrationEventService } from '../catalog-integration.service';

@Injectable()
export class OrderStatusChangedToPaidIntegrationEventHandler extends RabbitConsumer<OrderStatusChangedToPaidIntegrationEvent> {
  constructor(
    protected configService: ConfigService,
    @Inject(REPO.PRODUCT)
    private productRepo: IProductRepo,
    @Inject(CatalogIntegrationEventService.name) private catalogIntegrationService: ICatalogIntegrationEventService,
  ) {
    super(
      OrderStatusChangedToPaidIntegrationEventHandler.name,
      configService.get('catalogConsumer.productSubtractStock') as any,
    );
  }
  async process(source: OrderStatusChangedToPaidIntegrationEvent): Promise<void> {
    try {
      const ids: string[] = source.order_stock_items.map(item => item.product_id);
      const products = await this.productRepo.findAll({ filters: { _id: { $in: ids } }, fields: ['_id', 'quantity'] });
      for (const product of products) {
        const order_stock_item = source.order_stock_items.find(item => item.product_id === product._id.toString());
        if (order_stock_item) {
          product.quantity = product.quantity - order_stock_item.quantity;
          if (product.quantity >= 0) {
            // await sleep(3, 'seconds');
            await this.productRepo
              .getRepo()
              .findOneAndUpdate({ _id: product._id }, { $inc: { quantity: -order_stock_item.quantity } });
            await this.catalogIntegrationService.addAndSaveEvent({
              event_content: new Date().toISOString(),
              event_name: 'TEST-CONCURRENT',
            });
            console.log('=================== Done ===================');
          } else {
            throw new BadRequestException(`Product quantity${product.quantity}`);
          }
        }
      }
      console.log('Done Process Order');
    } catch (error) {
      throw error;
    }
  }
}
