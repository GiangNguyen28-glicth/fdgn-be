import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponse } from '@fdgn/common';
import { CurrentUser, IUser } from '@fdgn/share-ecm';

import { AtGuard } from '../../common';
import { ShopEntity } from '../../infra';
import { CreateShopDTO, FilterGetOneShop } from './dto';
import { ShopService } from './shop.service';

@ApiTags('Shope')
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  async findOne(@Query() filters: FilterGetOneShop): Promise<ShopEntity> {
    return await this.shopService.findOne(filters);
  }

  @Post()
  @UseGuards(AtGuard)
  async create(@Body() dto: CreateShopDTO, @CurrentUser() user: IUser): Promise<IResponse> {
    return await this.shopService.create(dto, user);
  }
}
