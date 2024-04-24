import { IEntity, Transform } from '@fdgn/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type NotificationModel = Model<Notification>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  methods: {
    transform(doc, ret) {
      ret.id = ret._id;
    },
  },
})
export class Notification implements IEntity {
  @Transform(({ value }) => value.toString())
  @Prop({ name: '_id' })
  id: string;

  @Prop({ trim: true })
  name: string;

  @Prop()
  user_id: number;

  @Prop()
  deleted_at?: Date;

  created_at?: Date;
  updated_at?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);