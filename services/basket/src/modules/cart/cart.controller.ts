import { Controller, Post, Body, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponse } from '@fdgn/common';
import { CurrentUser, IUser } from '@fdgn/share-ecm';

import { CheckOutDTO, CreateItemToCartDTO } from './dto';
import { CartService } from './cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCartItems(@CurrentUser() user: IUser) {
    return await this.cartService.getCartItems(user);
  }

  @Post()
  async addToCart(@Body() dto: CreateItemToCartDTO, @CurrentUser() user: IUser): Promise<IResponse> {
    return await this.cartService.addToCart(dto, user);
  }

  @Post('checkout')
  async checkout(@Body() dto: CheckOutDTO, @CurrentUser() user: IUser): Promise<IResponse> {
    return await this.cartService.checkout(dto, user);
  }
}
