import { IEntity } from '@fdgn/common';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entities';
import { Permission } from '../../common';

@Entity()
export class Resource implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: Object.values(Permission) })
  permission: Permission;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'resource_roles',
    joinColumn: { name: 'resource_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @Column()
  description: string;

  @Column('varchar', { array: true, nullable: true })
  updated_by_attribute: string[];

  @Column('varchar', { array: true, nullable: true })
  read_by_attribute: string[];

  created_by: number;

  @Column({ default: null })
  deleted_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
