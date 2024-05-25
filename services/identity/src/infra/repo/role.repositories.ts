import { TypeOrmRepo } from '@fdgn/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { REPO } from '../../common';
import { IRoleRepo } from '../../domain';
import { RoleEntity } from '../entities';

export class RoleRepo extends TypeOrmRepo<RoleEntity> implements IRoleRepo {
  constructor(
    @InjectRepository(RoleEntity)
    protected roleRepo: Repository<RoleEntity>,
  ) {
    super(roleRepo);
  }
}
export const RoleRepoProvider = {
  provide: REPO.ROLE,
  useClass: RoleRepo,
};
