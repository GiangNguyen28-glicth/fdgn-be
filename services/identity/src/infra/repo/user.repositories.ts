import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleType } from '@fdgn/share-ecm';
import { TypeOrmRepo } from '@fdgn/typeorm';
import { REPO } from '../../common';
import { IUserRepo } from '../../domain';
import { UserEntity } from '../entities';

export class UserRepo extends TypeOrmRepo<UserEntity> implements IUserRepo {
  constructor(
    @InjectRepository(UserEntity)
    protected userRepo: Repository<UserEntity>,
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
        'r.name as role_name',
      ])
      .getRawMany();

    return user;
  }
}
export const UserRepoProvider = {
  provide: REPO.USER,
  useClass: UserRepo,
};
