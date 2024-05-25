import { FilterGetAll } from '@fdgn/common';
import { IShop } from '@fdgn/share-ecm';
export class FilterGetOneShop implements Partial<IShop> {
  id?: number;
}

export class FilterGetAllShop extends FilterGetAll implements Partial<IShop> {
  id?: number;
}
