import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';
import axios from 'axios';

import { IResponse, OK } from '@fdgn/common';
import { RedisClientService } from '@fdgn/redis';
import { Product, User } from '@fdgn/share-domain';
import { RabbitMQProducer, ProducerMode } from '@fdgn/rabbitmq';

import { CheckOutDTO, CreateItemToCartDTO } from './dto';
import { CartItem } from './models';
import { IOrder } from './messages';
@Injectable()
export class CartService implements OnModuleInit {
  private readonly CART_REDIS_KEY = 'CART';
  constructor(
    private redisService: RedisClientService,
    private producer: RabbitMQProducer<IOrder>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.producer.setConfig({
      mode: ProducerMode.Exchange,
      exchange: this.configService.get<string>('producer.orderProcessing.exchange'),
      routingKey: this.configService.get<string>('producer.orderProcessing.routingKey'),
    });
  }

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

  async checkout(dto: CheckOutDTO, user: User): Promise<IResponse> {
    try {
      const response = await axios.get(`http://localhost:4017/catalog/product/${dto.items[0].product_id}`);
      const product: Product = await response.data;
      await this.producer.publish([
        {
          products: [
            {
              id: product._id,
              price: product.price,
              image_url: product.images[0].url,
              original_price: product.original_price,
              title: product.title,
            },
          ],
          card: dto.card,
          user_id: user.id,
        },
      ]);
      return { success: true, message: OK };
    } catch (error) {
      console.log('Error3: ', error);
      throw error;
    }
  }

  getCartRedisKey(user_id: number): string {
    return this.CART_REDIS_KEY + '_' + user_id;
  }
}
