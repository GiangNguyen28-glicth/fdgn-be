import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEntity, Transform, MongoID } from '@fdgn/common';

export type CateModel = Model<Category>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, id: true })
export class Category implements IEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ min: 1 })
  level: number;

  @Prop({ type: MongoID })
  parent_id: string | Category;

  @Prop()
  deleted_at?: Date;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  keyword: string;

  @Prop({ default: new Date() })
  created_at?: Date;
  updated_at?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
