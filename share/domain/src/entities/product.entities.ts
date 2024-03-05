import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEntity, Transform } from '@fdgn/common';

import { PRODUCT_STATUS } from '@domain/const';

export type ProductModel = Model<Product>;

@Schema()
export class ProductImage {
  @Prop({ trim: true })
  url: string;
}

@Schema()
export class ProductBase {
  @Prop({ min: 1 })
  originalPrice: number;

  @Prop({ max: 999999999 })
  price: number;

  @Prop({ min: 0 })
  quantity: number;

  @Prop({ enum: PRODUCT_STATUS, type: Number })
  status: number;

  @Prop([{ type: ProductImage }])
  images: ProductImage[];
}

@Schema()
export class Variant extends ProductBase {
  @Prop({ type: [String] })
  options: string[];
}

@Schema()
export class Attribute {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  value: string;
}

@Schema()
export class Specification {
  @Prop({ trim: true })
  type: string;

  @Prop([{ type: Attribute }])
  attributes: Attribute[];
}

@Schema()
export class ProductOption {
  @Prop({ trim: true })
  name: string;

  @Prop({ type: [String] })
  values: string[];
}

@Schema({ timestamps: true })
export class Product extends ProductBase implements IEntity {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: Specification })
  specifications?: Specification;

  @Prop([{ type: ProductOption }])
  options?: ProductOption[];

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  keyword: string;

  @Prop()
  deletedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
