import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Billing, BillingSchema } from '@fdgn/share-ecm';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentConsumer } from './payment.consumer';

@Module({
  imports: [MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }])],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentConsumer],
})
export class PaymentModule {}
