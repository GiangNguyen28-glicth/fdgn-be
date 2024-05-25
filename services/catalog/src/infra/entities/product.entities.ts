import { Transform } from '@fdgn/common';
import {
  IAttribute,
  IProduct,
  IProductBase,
  IProductImage,
  IProductOption,
  ISpecification,
  IVariant,
  ProductStatus,
} from '@fdgn/share-ecm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
export type ProductModel = Model<ProductEntity>;

@Schema()
export class ProductImage implements IProductImage {
  @Prop({ trim: true })
  url: string;
}

@Schema()
export class ProductBase implements IProductBase {
  @Prop({ min: 1 })
  original_price: number;

  @Prop({ max: 999999999 })
  price: number;

  @Prop({ min: 0 })
  quantity: number;

  @Prop({ enum: ProductStatus, type: Number })
  status: number;

  @Prop([{ type: ProductImage }])
  images: ProductImage[];
}

@Schema()
export class Variant extends ProductBase implements IVariant {
  @Prop({ type: [String] })
  options: string[];
}

@Schema()
export class Attribute implements IAttribute {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  value: string;
}

@Schema()
export class Specification implements ISpecification {
  @Prop({ trim: true })
  type: string;

  @Prop([{ type: Attribute }])
  attributes: Attribute[];
}

@Schema()
export class ProductOption implements IProductOption {
  @Prop({ trim: true })
  name: string;

  @Prop({ type: [String] })
  values: string[];
}

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class ProductEntity extends ProductBase implements IProduct {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: Specification })
  specifications?: Specification;

  @Prop([{ type: ProductOption }])
  options?: ProductOption[];

  @Prop()
  shop_id: number;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  keyword: string;

  @Prop()
  deleted_at?: Date;

  created_at?: Date;
  updated_at?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
