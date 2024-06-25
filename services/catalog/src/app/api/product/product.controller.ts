import { Controller, Get, Query, Param, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, RpcException } from '@nestjs/microservices';

import {sleep} from '@fdgn/common';

import { ProductService } from './product.service';
import { FilterGetAllProduct } from './dto';
import { ProductEntity } from '../../../infra';
import { ProductsService } from './interfaces/grpc.service';
import { ProductById } from './interfaces/grpc.interface';

@Controller('product')
export class ProductController implements OnModuleInit {
  private productsService: ProductsService;

  constructor(private productService: ProductService, @Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.productsService = this.client.getService<ProductsService>('ProductsService');
  }

  @Get()
  async findAll(@Query() filters_query: FilterGetAllProduct): Promise<any> {
    return await this.productService.findAll(filters_query);
  }

  @Get('dump-data')
  async dumpData(): Promise<string> {
    return await this.productService.dumData();
  }

  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<ProductEntity> {
    // await sleep(10,'seconds');
    return await this.productService.findProductById(id);
  }

  @GrpcMethod('ProductsService')
  async findOne(data: ProductById): Promise<any> {
    try {
      return await this.productService.findProductById(data._id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
