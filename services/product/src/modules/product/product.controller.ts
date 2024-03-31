import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UNITS_OF_TIME } from '@fdgn/common';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('dump-data')
  async dumpData(): Promise<string> {
    return await this.productService.dumData();
  }

  @Get('test-2')
  async test2() {
    const now = Date.now();
    while (Date.now() - now < 50000) {}
    // await this.sleep(50, 'seconds');
    return 'Test 1';
  }

  async sleep(time: number, unit: UNITS_OF_TIME = 'milliseconds') {
    const valueUnitOfTime = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
    };
    return new Promise(resolve => setTimeout(resolve, valueUnitOfTime[unit] * time));
  }

  @Get('test-3')
  test3(@Req() req: Request) {
    console.log(req);
    console.log('Req');
    return 'Test 3';
  }
}
