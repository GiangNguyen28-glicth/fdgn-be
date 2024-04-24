import { Controller, Post, Body, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponse } from '@fdgn/common';
import { CurrentUser, User } from '@fdgn/share-domain';

import { CheckOutDTO, CreateItemToCartDTO } from './dto';
import { CartService } from './cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCartItems(@CurrentUser() user: User) {
    return await this.cartService.getCartItems(user);
  }

  @Post()
  async addToCart(@Body() dto: CreateItemToCartDTO, @CurrentUser() user: User): Promise<IResponse> {
    return await this.cartService.addToCart(dto, user);
  }

  @Post('checkout')
  @UseInterceptors(ClassSerializerInterceptor)
  async checkout(@Body() dto: CheckOutDTO, @CurrentUser() user: User): Promise<IResponse> {
    return await this.cartService.checkout(dto, user);
  }
}