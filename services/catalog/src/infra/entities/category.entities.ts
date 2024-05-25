import { Transform } from '@fdgn/common';
import { ICategory, MongoID } from '@fdgn/share-ecm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
export type CateModel = Model<CategoryEntity>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class CategoryEntity implements ICategory {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ min: 1 })
  level: number;

  @Prop({ type: MongoID })
  parent_id: string | CategoryEntity;

  @Prop()
  deleted_at?: Date;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  keyword: string;

  created_at?: Date;
  updated_at?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
