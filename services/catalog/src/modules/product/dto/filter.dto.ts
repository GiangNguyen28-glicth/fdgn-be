import { Product } from '@fdgn/share-domain';
import { FilterGetAll } from '@fdgn/common';

export class FilterGetOneProduct implements Partial<Product> {
  _id?: string;
}

export class FilterGetAllProduct extends FilterGetAll implements Partial<Product> {
  title?: string;
  shop_id?: number;
}
