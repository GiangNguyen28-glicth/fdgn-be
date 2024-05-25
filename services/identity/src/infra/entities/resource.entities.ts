import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IResource, Permission } from '@fdgn/share-ecm';
import { RoleEntity } from './role.entities';

@Entity({name: 'resource'})
export class ResourceEntity implements IResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: Object.values(Permission) })
  permission: Permission;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'resource_roles',
    joinColumn: { name: 'resource_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @Column()
  description: string;

  @Column('varchar', { array: true, nullable: true })
  updated_by_attribute: string[];

  @Column('varchar', { array: true, nullable: true })
  read_by_attribute: string[];

  created_by: number;

  @Column({ default: null })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
