import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UNITS_OF_TIME } from '@fdgn/common';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
}
