import { Injectable, Inject } from '@nestjs/common';
import { DBS_TYPE, getRandomNumber, toKeyword } from '@fdgn/common';
import { faker } from '@faker-js/faker';

import { PRODUCT_PROVIDER, IProductRepo, Product, PRODUCT_STATUS } from '@fdgn/share-domain';
const dbsType = DBS_TYPE.MONGO;
@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_PROVIDER.MONGO_REPO)
    private productRepo: IProductRepo,
  ) {}

  async dumData() {
    const createRandomProduct = (): Product => {
      const title = faker.commerce.productName();
      const keyword = toKeyword(title);
      return {
        title,
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        originalPrice: Number(faker.commerce.price()),
        quantity: getRandomNumber(1, 100),
        images: [{ url: faker.image.url() }],
        keyword,
        slug: keyword.replace(/ /g, '-'),
        status: PRODUCT_STATUS.ACTIVE,
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
}
