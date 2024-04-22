import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import axios from 'axios';

import { IResponse, OK } from '@fdgn/common';
import { RedisClientService } from '@fdgn/redis';
import { Product, User } from '@fdgn/share-domain';

import { CreateItemToCartDTO } from './dto';
import { CartItem } from './models';
@Injectable()
export class CartService {
  private readonly CART_REDIS_KEY = 'CART';
  constructor(private redisService: RedisClientService) {}

  async addToCart(dto: CreateItemToCartDTO, user: User): Promise<IResponse> {
    try {
      const response = await axios.get(`http://localhost:4017/catalog/product/${dto.product_id}`);
      const product: Product = await response.data;
      let cart_items = await this.redisService.get<CartItem[]>({ key: this.getCartRedisKey(user.id) });
      if (isNil(cart_items)) {
        cart_items = [new CartItem(Number(product.shop_id), [{ product_id: dto.product_id, quantity: dto.quantity }])];
        await this.redisService.set({ key: this.getCartRedisKey(user.id), value: JSON.stringify(cart_items) });
        return { success: true, message: OK };
      }
      return { success: true, message: OK };
    } catch (error) {
      return error;
    }
  }

  async getCartItems(user: User): Promise<CartItem[]> {
    try {
      const cart_items = await this.redisService.get<CartItem[]>({ key: this.getCartRedisKey(user.id) });
      if (isNil(cart_items)) {
        return [];
      }
      return cart_items;
    } catch (error) {
      throw error;
    }
  }

  getCartRedisKey(user_id: number): string {
    return this.CART_REDIS_KEY + '_' + user_id;
  }
}
