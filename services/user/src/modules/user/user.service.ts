import { Injectable, Inject } from '@nestjs/common';
import { IUserRepo, USER_PROVIDER } from '@fdgn/share-domain';
@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDER.MONGO_REPO) private userRepo: IUserRepo) {}
}
