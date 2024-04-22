import { FilterGetAll } from '@fdgn/common';
import { Shop } from '@fdgn/share-domain';
export class FilterGetOneShop implements Partial<Shop> {
  id?: number;
}

export class FilterGetAllShop extends FilterGetAll implements Partial<Shop> {
  id?: number;
}
