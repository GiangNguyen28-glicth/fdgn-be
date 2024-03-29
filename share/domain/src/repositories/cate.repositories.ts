import { InjectModel } from '@nestjs/mongoose';

import { MongoRepo } from '@fdgn/mongoose';

import { Category, CateModel } from '../entities';

export const CATE_PROVIDER = {
  MONGO_REPO: 'CATE_MONGO_PROVIDER',
};

export class CateMongoRepo extends MongoRepo<Category> {
  constructor(
    @InjectModel(Category.name)
    protected cateRepo: CateModel,
  ) {
    super(cateRepo);
  }
}

export const CateMongoRepoProvider = {
  provide: CATE_PROVIDER.MONGO_REPO,
  useClass: CateMongoRepo,
};
