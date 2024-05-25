import { InjectModel } from '@nestjs/mongoose';

import { MongoRepo } from '@fdgn/mongoose';

import { ICateRepo } from '../../domain';
import { REPO } from '../../common';
import { CateModel, CategoryEntity } from '../entities';
export class CateRepo extends MongoRepo<CategoryEntity> implements ICateRepo {
  constructor(
    @InjectModel('categories')
    protected cateRepo: CateModel,
  ) {
    super(cateRepo);
  }
}

export const CateRepoProvider = {
  provide: REPO.CATE,
  useClass: CateRepo,
};
