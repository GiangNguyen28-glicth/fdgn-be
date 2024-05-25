import { IUser, RegisterType } from '@fdgn/share-ecm';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entities';
import { ShopEntity } from './shop.entities';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 51, nullable: true })
  name: string;

  @Column({ length: 51 })
  email: string;

  @Column({ length: 128 })
  password: string;

  @Column({ type: 'enum', enum: Object.values(RegisterType), default: RegisterType.NORMAL })
  register_type: RegisterType;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @OneToOne(() => ShopEntity, shop => shop.user)
  @JoinColumn({ name: 'shop_id' })
  shop: ShopEntity;

  @Column({ default: false })
  is_confirm_mail: boolean;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  keyword: string;

  @Column({ default: null, type: 'date' })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
