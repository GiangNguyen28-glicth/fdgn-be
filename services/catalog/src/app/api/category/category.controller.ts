import { Controller, Post, Body } from '@nestjs/common';

import { IResponse } from '@fdgn/common';

import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private cateService: CategoryService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDTO): Promise<IResponse> {
    return await this.cateService.create(dto);
  }
}
