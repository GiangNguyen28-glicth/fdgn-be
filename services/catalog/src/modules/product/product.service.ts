import { Inject, Injectable } from '@nestjs/common';
import { DBS_TYPE, FilterBuilder, IResult, throwIfNotExists } from '@fdgn/common';
import { faker } from '@faker-js/faker';
import { random } from 'lodash';

import { IProductRepo, PRODUCT_PROVIDER, Product } from '@fdgn/share-domain';
import { toKeyword } from '@fdgn/common';

import { FilterGetAllProduct, FilterGetOneProduct } from './dto';
import { PRODUCT_STATUS } from '../../common';
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
    return await this.productRepo.findOne({ filters });
  }

  async findAll(filtersQuery: FilterGetAllProduct): Promise<any> {
    const { filters } = new FilterBuilder<Product>()
      .getInstance(dbsType)
      .setFilterItem('shop_id', '$eq', filtersQuery?.shop_id)
      .buildQuery();
    return await this.productRepo.findAll({
      filters,
      pagination: { page: filtersQuery?.page, size: filtersQuery?.size },
    });
  }

  async dumData() {
    const createRandomProduct = (): Product => {
      const title = faker.commerce.productName();
      const keyword = toKeyword(title);
      return {
        title,
        description: faker.commerce.productDescription(),
        original_price: Number(faker.commerce.price()),
        price: Number(faker.commerce.price()),
        quantity: random(1, 100),
        images: [{ url: faker.image.url() }],
        keyword,
        slug: keyword.replace(/ /g, '-'),
        status: PRODUCT_STATUS.ACTIVE,
        shop_id: random(1, 100),
      };
    };
    const products: Product[] = faker.helpers.multiple(createRandomProduct, {
      count: 1000000,
    });
    console.log('Da xong');
    while (products.length) {
      const newProducts = products.slice(0, 10000);
      await this.productRepo.insertMany(newProducts);
    }
    return 'Done';
  }

  async findProductById(_id: string) {
    try {
      const product = await this.findOne({ _id });
      throwIfNotExists(product, 'Product Item not found !!!');
      return product;
    } catch (error) {
      throw error;
    }
  }
}
