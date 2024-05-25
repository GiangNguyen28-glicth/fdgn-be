import { InjectModel } from '@nestjs/mongoose';

import { MongoRepo } from '@fdgn/mongoose';

import { IProduct } from '@fdgn/share-ecm';
import { REPO } from '../../common';
import { IProductRepo } from '../../domain';
import { ProductEntity, ProductModel } from '../entities';

export class ProductRepo extends MongoRepo<ProductEntity> implements IProductRepo {
  constructor(
    @InjectModel('products')
    protected productModel: ProductModel,
  ) {
    super(productModel);
  }

  async insertMany(products: IProduct[]): Promise<void> {
    await this.productModel.insertMany(products);
  }
}

export const ProductRepoProvider = {
  provide: REPO.PRODUCT,
  useClass: ProductRepo,
};
