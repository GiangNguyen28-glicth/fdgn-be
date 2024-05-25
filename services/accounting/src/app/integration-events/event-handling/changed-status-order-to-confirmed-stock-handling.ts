import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import { RabbitConsumer } from '@fdgn/rabbitmq';
import { BillingStatus } from '@fdgn/share-ecm';

import { AccountingIntegrationEventService, IAccountingIntegrationEventService } from '../accounting-integration.service';
import { OrderPaymentSucceededIntegrationEvent, OrderStatusChangedToStockConfirmedIntegrationEvent } from '../events';
import { PaymentContext, REPO, StripePaymentStrategy } from '../../../common';
import { IBillingRepo } from '../../../domain';

@Injectable()
export class OrderStatusChangedToConfirmedStockIntegrationEventHandler extends RabbitConsumer<OrderStatusChangedToStockConfirmedIntegrationEvent> {
  private payment_context: PaymentContext;
  constructor(
    protected configService: ConfigService,
    @Inject(AccountingIntegrationEventService.name) private accountingIntegrationService: IAccountingIntegrationEventService,
    @Inject(REPO.BILLING) private billingRepo: IBillingRepo,
  ) {
    super(
      OrderStatusChangedToConfirmedStockIntegrationEventHandler.name,
      configService.get('accountingConsumer.paymentCheckoutOrder') as any,
    );
    this.payment_context = new PaymentContext();
  }

  async process(source: OrderStatusChangedToStockConfirmedIntegrationEvent): Promise<void> {
    try {
      const billing = await this.billingRepo.insert({
        entity: { buyer_id: source.buyer.id, buyer_name: source.buyer.name, order_id: source.order_id },
      });
      await this.billingRepo.save({ entity: billing });
      this.payment_context.strategy = new StripePaymentStrategy(this.configService);
      const payment_intent = await this.payment_context.executeStrategy<Stripe.Response<Stripe.PaymentIntent>>(source);
      if (payment_intent['status'] !== 'succeeded') {
        billing.status = BillingStatus.ERROR;
        await this.billingRepo.save({ entity: billing });
        throw new BadRequestException('Thanh toán thất bại');
      }
      const order_payment_succeeded = new OrderPaymentSucceededIntegrationEvent(source.order_id);
      const evt_log = await this.accountingIntegrationService.addAndSaveEvent({
        context: OrderStatusChangedToConfirmedStockIntegrationEventHandler.name,
        event_content: JSON.stringify(order_payment_succeeded),
        event_name: OrderPaymentSucceededIntegrationEvent.name,
        request_id: '1',
        transaction_id: '1',
      });
      await this.accountingIntegrationService.publishEventsThroughEventBus(evt_log._id);
    } catch (error) {
      console.log(error);
    }
  }
}
