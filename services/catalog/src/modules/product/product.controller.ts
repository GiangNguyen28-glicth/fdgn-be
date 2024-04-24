import { Controller, Get, Query, Param } from '@nestjs/common';

import { Product } from '@fdgn/share-domain';

import { ProductService } from './product.service';
import { FilterGetAllProduct } from './dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(@Query() filtersQuery: FilterGetAllProduct): Promise<any> {
    return await this.productService.findAll(filtersQuery);
  }

  @Get('dump-data')
  async dumpData(): Promise<string> {
    return await this.productService.dumData();
  }

  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.findProductById(id);
  }
}
