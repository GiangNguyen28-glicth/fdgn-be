import { IBaseEntity, IEntity } from '@fdgn/common';

export interface IProductImage {
  url: string;
}

export interface IProductBase {
  original_price: number;

  price: number;

  quantity: number;

  status: number;

  images: IProductImage[];
}

export interface IVariant extends IProductBase {
  options: string[];
}

export interface IAttribute {
  name: string;

  value: string;
}

export class ISpecification {
  type: string;

  attributes: IAttribute[];
}

export class IProductOption {
  name: string;

  values: string[];
}

export interface IProduct extends IProductBase, IBaseEntity {
  _id: string;

  title: string;

  description: string;

  specifications?: ISpecification;

  options?: IProductOption[];

  shop_id: number;

  slug: string;

  keyword: string;
}
