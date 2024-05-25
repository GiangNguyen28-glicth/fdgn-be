import { Inject, Injectable } from '@nestjs/common';

import { IResponse } from '@fdgn/common';

import { REPO } from '../../../common';
import { ICateRepo } from '../../../domain';
import { CreateCategoryDTO } from './dto';
@Injectable()
export class CategoryService {
  constructor(
    @Inject(REPO.CATE)
    private cateRepo: ICateRepo,
  ) {}

  async create(dto: CreateCategoryDTO): Promise<IResponse> {
    try {
      const category = await this.cateRepo.insert({ entity: dto });
      await this.cateRepo.save({ entity: category });
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
