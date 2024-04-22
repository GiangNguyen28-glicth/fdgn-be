import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { TypeOrmRepo } from '@fdgn/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities';

export const ROLE_PROVIDER = {
  TYPE_ORM_REPO: Role.name.toUpperCase() + '_' + DBS_TYPE.TYPE_ORM,
};

export interface IRoleRepo extends ICrudRepo<Role> {}

export class RoleTypeOrmRepo extends TypeOrmRepo<Role> {
  constructor(
    @InjectRepository(Role)
    protected roleRepo: Repository<Role>,
  ) {
    super(roleRepo);
  }
}
export const RoleTypeOrmProvider = {
  provide: ROLE_PROVIDER.TYPE_ORM_REPO,
  useClass: RoleTypeOrmRepo,
};
