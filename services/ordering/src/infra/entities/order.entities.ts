import { IOrder, OrderStatus } from '@fdgn/share-ecm';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../domain';
import { BuyerEntity } from './buyer.entities';
import { OrderItemEntity } from './order-item.entities';

@Entity({ name: 'orders' })
export class OrderEntity extends Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  created_by: number;

  @Column({ nullable: false })
  shipping_address: string;

  @Column({ type: 'enum', enum: Object.values(OrderStatus), default: OrderStatus.SUBMITTED })
  status: OrderStatus;

  @OneToMany(() => OrderItemEntity, order_item => order_item.order)
  order_items: OrderItemEntity[];

  @OneToOne(() => BuyerEntity, buyer => buyer.order)
  @JoinColumn({ name: 'buyer_id' })
  buyer: BuyerEntity;

  @Column({ default: null, type: 'date' })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
