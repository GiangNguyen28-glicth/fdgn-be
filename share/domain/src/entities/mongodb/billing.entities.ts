import { IEntity, Transform } from '@fdgn/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type BillingModel = Model<Billing>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Billing implements IEntity {
  @Transform(({ value }) => value.toString())
  @Prop({ name: '_id' })
  id: string;

  @Prop()
  order_id: number;

  @Prop()
  user_id: number;

  @Prop()
  total_price: number;

  created_at?: Date;
  updated_at?: Date;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);
