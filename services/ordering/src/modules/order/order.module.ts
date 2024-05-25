import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity, OrderRepoProvider } from '../../infra';
import { OrderItemModule } from '../order-item';
import { OrderCreatedConsumer } from './order.consumer';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), OrderItemModule],
  controllers: [OrderController],
  providers: [OrderService, OrderCreatedConsumer, OrderRepoProvider],
  exports: [OrderService],
})
export class OrderModule {}
