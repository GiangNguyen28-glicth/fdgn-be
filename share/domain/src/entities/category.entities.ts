import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEntity, Transform, MongoID } from '@fdgn/common';

export type CateModel = Model<Category>;

@Schema({ timestamps: true })
export class Category implements IEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ min: 1 })
  level: number;

  @Prop({ type: MongoID })
  parentId: string | Category;

  @Prop()
  deletedAt?: Date;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  keyword: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
