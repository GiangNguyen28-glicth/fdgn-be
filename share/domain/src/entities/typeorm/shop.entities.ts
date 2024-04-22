import { IEntity } from '@fdgn/common';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ShopLevel, ShopStatus } from '../../common';
import { User } from './user.entities';

@Entity({ name: 'shop' })
export class Shop implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: Object.values(ShopLevel), default: ShopLevel.NONE })
  level: ShopLevel;

  @Column({ type: 'timestamp' })
  launch_date: Date;

  @Column({ default: 0 })
  total_rating: number;

  @Column({ type: 'float', default: 0 })
  rating_score: number;

  @OneToOne(() => User, user => user.shop)
  @JoinColumn()
  user: User;

  @Column({ type: 'enum', enum: Object.values(ShopStatus), default: ShopStatus.ACTIVE })
  status: ShopStatus;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  keyword: string;

  @Column({ default: null })
  deleted_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
