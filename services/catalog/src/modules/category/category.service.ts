import { Injectable, Inject } from '@nestjs/common';

import { IResponse } from '@fdgn/common';
import { CATE_PROVIDER, ICateRepo } from '@fdgn/share-domain';
import { CreateCategoryDTO } from './dto';
@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATE_PROVIDER.MONGO_REPO)
    private cateRepo: ICateRepo,
  ) {}

  async create(dto: CreateCategoryDTO): Promise<IResponse> {
    try {
      const category = await this.cateRepo.insert(dto);
      await this.cateRepo.save(category);
      return {
        success: true,
        message: category._id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
