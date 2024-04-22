import { IEntity } from '@fdgn/common';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entities';

@Entity({ name: 'order_items' })
export class OrderItem implements IEntity {
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
  image_url: string;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @ManyToOne(() => Order, order => order.order_items)
  order: Order;

  @Column({ default: null, type: 'date' })
  deleted_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
