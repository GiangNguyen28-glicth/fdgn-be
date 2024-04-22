import { IEntity } from '@fdgn/common';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { RegisterType } from '../../common/const';
import { Role } from './role.entities';
import { Shop } from './shop.entities';

@Entity({ name: 'users' })
export class User implements IEntity {
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

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @OneToOne(() => Shop, shop => shop.user)
  @JoinColumn()
  shop: Shop;

  @Column({ default: false })
  is_confirm_mail: boolean;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  keyword: string;

  @Column({ default: null, type: 'date' })
  deleted_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
