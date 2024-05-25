import { IBuyer, IOrder } from '@fdgn/share-ecm';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entities';

@Entity({ name: 'buyer' })
export class BuyerEntity implements IBuyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => OrderEntity, order => order.buyer)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
  
  @Column()
  number: string;
  
  @Column()
  exp_month: number;
  
  @Column()
  exp_year: number;
  
  @Column()
  cvc: string;

  @Column()
  holder_name: string;

  @Column()
  postal_code: string;

  @Column({ default: null, type: 'date' })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
