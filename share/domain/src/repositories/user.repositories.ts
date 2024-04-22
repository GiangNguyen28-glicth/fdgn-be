import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { TypeOrmRepo } from '@fdgn/typeorm';

import { RoleType } from '../common';
import { User } from '../entities';

export const USER_PROVIDER = {
  TYPE_ORM_REPO: User.name.toUpperCase() + '_' + DBS_TYPE.TYPE_ORM,
};

export interface IUserRepo extends ICrudRepo<User> {
  getUserPermissionByIdAndRole(id: number, name: RoleType[]);
}

export class UserTypeOrmRepo extends TypeOrmRepo<User> {
  constructor(
    @InjectRepository(User)
    protected userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async getUserPermissionByIdAndRole(id: number, name: RoleType[]) {
    const user = await this.userRepo
      .createQueryBuilder('users')
      .innerJoin('user_roles', 'ur', 'users.id = ur.user_id')
      .innerJoin('roles', 'r', 'r.id = ur.role_id')
      .innerJoin('resource_roles', 'rr', 'rr.role_id = ur.role_id')
      .innerJoin('resource', 'rs', 'rs.id = rr.resource_id')
      .where('users.id = :id', { id })
      .where('r.name IN (:...name)', { name })
      .select([
        'users.id as user_id',
        'users.name as user_name',
        'ur.role_id',
        'rs.permission',
        'rs.name as resource_name',
        'r.name as role_name'
      ])
      .getRawMany();

    return user;
  }
}
export const UserTypeOrmProvider = {
  provide: USER_PROVIDER.TYPE_ORM_REPO,
  useClass: UserTypeOrmRepo,
};
