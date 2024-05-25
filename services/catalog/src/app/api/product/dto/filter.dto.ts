import { ProductEntity } from "../../../../infra";
import { FilterGetAll } from '@fdgn/common';

export class FilterGetOneProduct implements Partial<ProductEntity> {
  _id?: string;
}

export class FilterGetAllProduct extends FilterGetAll implements Partial<ProductEntity> {
  title?: string;
  shop_id?: number;
}
