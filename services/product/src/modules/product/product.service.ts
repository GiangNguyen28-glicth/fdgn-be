import { DBS_TYPE, FilterBuilder } from '@fdgn/common';
import { Inject, Injectable } from '@nestjs/common';

import { IProductRepo, PRODUCT_PROVIDER, Product } from '@fdgn/share-domain';
import { FilterGetOneProduct } from './dto';
const dbsType = DBS_TYPE.MONGO;
@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_PROVIDER.MONGO_REPO)
    private productRepo: IProductRepo,
  ) {}

  async findOne(filter: FilterGetOneProduct): Promise<Product> {
    const { filters } = new FilterBuilder<Product>()
      .getInstance(dbsType)
      .setFilterItem('_id', '$eq', filter?._id)
      .buildQuery();
  }
}
