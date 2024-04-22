import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser, Shop, User } from '@fdgn/share-domain';
import { IResponse } from '@fdgn/common';

import { ShopService } from './shop.service';
import { CreateShopDTO, FilterGetOneShop } from './dto';
import { AtGuard } from '../../common';

@ApiTags(Shop.name)
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  async findOne(@Query() filters: FilterGetOneShop): Promise<Shop> {
    return await this.shopService.findOne(filters);
  }

  @Post()
  @UseGuards(AtGuard)
  async create(@Body() dto: CreateShopDTO, @CurrentUser() user: User): Promise<IResponse> {
    return await this.shopService.create(dto, user);
  }
}
