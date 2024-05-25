import { IRole, RoleType } from '@fdgn/share-ecm';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResourceEntity } from './resource.entities';
import { UserEntity } from './user.entities';

@Entity({ name: 'roles' })
export class RoleEntity implements IRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Object.values(RoleType) })
  name: RoleType;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: UserEntity[];

  @ManyToMany(() => ResourceEntity)
  @JoinTable({
    name: 'resource_roles',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'resource_id', referencedColumnName: 'id' },
  })
  resources: ResourceEntity[];

  @Column({ default: null })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
