import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { IOrderItem } from '@fdgn/share-ecm';
import { OrderEntity } from './order.entities';

@Entity({ name: 'order_items' })
export class OrderItemEntity implements IOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original_price: number;

  @Column()
  sell_price: number;

  @Column()
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_image_url: string;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @ManyToOne(() => OrderEntity, order => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({ default: null, type: 'date' })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
