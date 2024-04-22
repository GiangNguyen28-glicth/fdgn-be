import { IEntity } from '@fdgn/common';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderStatus } from '../../common';
import { OrderItem } from './order-item.entities';

@Entity({ name: 'orders' })
export class Order implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  created_by: number;

  @Column({ nullable: false })
  shipping_address: string;

  @Column({ type: 'enum', enum: Object.values(OrderStatus) })
  status: OrderStatus;

  @OneToMany(() => OrderItem, order_item => order_item.order)
  order_items: OrderItem[];

  @Column({ default: null, type: 'date' })
  deleted_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
