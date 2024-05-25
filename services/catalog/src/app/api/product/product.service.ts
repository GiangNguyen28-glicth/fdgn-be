import { faker } from '@faker-js/faker';
import { Inject, Injectable } from '@nestjs/common';
import { random } from 'lodash';

import { throwIfNotExists, toKeyword } from '@fdgn/common';
import { FilterMongoBuilder } from '@fdgn/mongoose';

import { ProductEntity } from '../../../infra';
import { PRODUCT_STATUS, REPO } from '../../../common';
import { IProductRepo } from '../../../domain';
import { FilterGetAllProduct, FilterGetOneProduct } from './dto';
@Injectable()
export class ProductService {
  constructor(
    @Inject(REPO.PRODUCT)
    private productRepo: IProductRepo,
  ) {}

  async findOne(filter: FilterGetOneProduct): Promise<ProductEntity> {
    const { filters } = new FilterMongoBuilder<ProductEntity>().setFilterItem('_id', '$eq', filter?._id).buildQuery();
    return await this.productRepo.findOne({ filters });
  }

  async findAll(filters_query: FilterGetAllProduct): Promise<any> {
    const { filters } = new FilterMongoBuilder<ProductEntity>()
      .setFilterItem('shop_id', '$eq', filters_query?.shop_id)
      .buildQuery();
    return await this.productRepo.findAll({
      filters,
      pagination: { page: filters_query?.page, size: filters_query?.size },
    });
  }

  async dumData() {
    const createRandomProduct = (): ProductEntity => {
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
      } as any;
    };
    const products: ProductEntity[] = faker.helpers.multiple(createRandomProduct, {
      count: 10,
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
