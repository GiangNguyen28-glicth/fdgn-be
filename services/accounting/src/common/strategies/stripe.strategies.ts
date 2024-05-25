import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import { IBuyer } from '@fdgn/share-ecm';

import { IPaymentStrategy } from '../interfaces';
import { OrderStatusChangedToStockConfirmedIntegrationEvent } from '../../app';

export class StripePaymentStrategy implements IPaymentStrategy {
  private stripeConfig: Stripe.StripeConfig = {
    apiVersion: '2024-04-10',
  };
  private stripe: Stripe;
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('stripe.clientSecretKey') as any, this.stripeConfig);
  }

  async createPayment(
    event: OrderStatusChangedToStockConfirmedIntegrationEvent,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const paymentMethod = await this.createPaymentMethod(event.buyer);
    const { id } = paymentMethod;
    const payment_intent = await this.stripe.paymentIntents.create({
      setup_future_usage: 'on_session',
      amount: event.total_price || 3000,
      currency: 'vnd',
      confirm: true,
      payment_method_types: ['card'],
      payment_method: id,
    });
    return payment_intent;
  }

  async createPaymentMethod(buyer: IBuyer): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    const { cvc, exp_month, holder_name, number, exp_year } = buyer;
    const payment_method = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number,
        cvc,
        exp_year,
        exp_month,
      },
      billing_details: {
        name: holder_name,
        address: {
          postal_code: holder_name,
        },
      },
    });

    return payment_method;
  }
}
