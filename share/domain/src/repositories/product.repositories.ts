import { InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { MongoRepo } from '@fdgn/mongoose';
import { ICrudRepo, DBS_TYPE } from '@fdgn/common';

import { Product, ProductModel } from '../entities';

export const PRODUCT_PROVIDER = {
  MONGO_REPO: Product.name.toUpperCase() + '_' + DBS_TYPE.MONGO,
};

export interface IProductRepo extends ICrudRepo<Product> {
  insertMany(products: Product[]): void;
}

export class ProductMongoRepo extends MongoRepo<Product> {
  constructor(
    @InjectModel(Product.name)
    protected productModel: ProductModel,
  ) {
    super(productModel);
  }

  async insertMany(products: Product[]): Promise<void> {
    await this.productModel.insertMany(products);
  }
}

export const ProductMongoRepoProvider = {
  provide: PRODUCT_PROVIDER.MONGO_REPO,
  useClass: ProductMongoRepo,
};
