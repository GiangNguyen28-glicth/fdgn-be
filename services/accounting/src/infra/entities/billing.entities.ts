import { Transform } from '@fdgn/common';
import { BillingStatus, IBilling } from '@fdgn/share-ecm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type BillingModel = Model<BillingEntity>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class BillingEntity implements IBilling {
  @Transform(({ value }) => value.toString())
  @Prop({ name: '_id' })
  _id: string;

  @Prop()
  order_id: number;

  @Prop()
  buyer_id: number;

  @Prop()
  buyer_name: string;

  @Prop({ type: String, enum: Object.values(BillingStatus) })
  status: BillingStatus;
  
  @Prop()
  error: string;

  @Prop()
  total_price: number;

  created_at?: Date;
  
  updated_at?: Date;
}

export const BillingSchema = SchemaFactory.createForClass(BillingEntity);
