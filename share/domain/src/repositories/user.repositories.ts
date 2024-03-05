import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { MongoRepo } from '@fdgn/mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserModel } from '../entities';

export const USER_PROVIDER = {
  MONGO_REPO: User.name.toUpperCase() + '_' + DBS_TYPE.MONGO,
};

export interface IUserRepo extends ICrudRepo<User> {}

export class UserMongoRepo extends MongoRepo<User> {
  constructor(
    @InjectModel(User.name)
    protected userRepo: UserModel,
  ) {
    super(userRepo);
  }
}
export const UserMongoProvider = {
  provide: USER_PROVIDER.MONGO_REPO,
  useClass: UserMongoRepo,
};
