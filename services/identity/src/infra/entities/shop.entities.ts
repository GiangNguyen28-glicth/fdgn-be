import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IShop, ShopLevel, ShopStatus } from '@fdgn/share-ecm';
import { UserEntity } from './user.entities';

@Entity({ name: 'shop' })
export class ShopEntity implements IShop {
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

  @OneToOne(() => UserEntity, user => user.shop)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'enum', enum: Object.values(ShopStatus), default: ShopStatus.ACTIVE })
  status: ShopStatus;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  keyword: string;

  @Column({ default: null })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
