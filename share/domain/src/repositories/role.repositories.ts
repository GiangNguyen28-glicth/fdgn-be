import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoRepo } from '@fdgn/mongoose';

import { Role, RoleModel } from '../entities';

export const ROLE_PROVIDER = {
  MONGO_REPO: Role.name.toUpperCase() + '_' + DBS_TYPE.MONGO,
};

export interface IRoleRepo extends ICrudRepo<Role> {}

export class RoleMongoRepo extends MongoRepo<Role> {
  constructor(
    @InjectModel(Role.name)
    protected roleRepo: RoleModel,
  ) {
    super(roleRepo);
  }
}
export const RoleMongoProvider = {
  provide: ROLE_PROVIDER.MONGO_REPO,
  useClass: RoleMongoRepo,
};
