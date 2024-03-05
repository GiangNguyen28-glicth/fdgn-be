import { IEntity, Transform } from '@fdgn/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type ResourceModel = Model<Resource>;

@Schema({ timestamps: true })
export class Resource implements IEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ default: null })
  deletedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
export const ResourceSchema = SchemaFactory.createForClass(Resource);
