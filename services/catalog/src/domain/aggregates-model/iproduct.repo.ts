import { IBaseCurdMongo } from '@fdgn/mongoose';
import { ProductEntity, ProductModel } from '../../infra';


export interface IProductRepo extends IBaseCurdMongo<ProductEntity, ProductModel> {
  insertMany(products: ProductEntity[]): void;
}
