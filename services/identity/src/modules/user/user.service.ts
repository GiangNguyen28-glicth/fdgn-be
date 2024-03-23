import { Injectable, Inject } from '@nestjs/common';
import { IResult, formatResult, IResponse, FilterBuilder, DBS_TYPE, throwIfNotExists } from '@fdgn/common';
import { IUserRepo, USER_PROVIDER, User } from '@fdgn/share-domain';
import { CreateUserDTO, FilterGetAllUser, FilterGetOneUser } from './dto';
const dbsType: DBS_TYPE = DBS_TYPE.MONGO;
@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDER.MONGO_REPO) private userRepo: IUserRepo) {}

  async create(dto: CreateUserDTO): Promise<User> {
    try {
      const user = await this.userRepo.insert(dto);
      await this.userRepo.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(filter: FilterGetAllUser): Promise<IResult<User>> {
    try {
      const [results, totalCount] = await Promise.all([this.userRepo.findAll(), this.userRepo.count()]);
      return formatResult(results, totalCount);
    } catch (error) {
      throw error;
    }
  }

  async findOne(filtersQuery: FilterGetOneUser): Promise<User> {
    try {
      const { filters } = new FilterBuilder<User>()
        .getInstance(dbsType)
        .setFilterItem('_id', '$eq', filtersQuery?._id)
        .setFilterItem('email', '$eq', filtersQuery?.email)
        .buildQuery();
      const user = await this.userRepo.findOne({ filters });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(_id: string): Promise<User> {
    try {
      const user = await this.findOne({ _id });
      throwIfNotExists(user, 'User not found !');
      return user;
    } catch (error) {
      throw error;
    }
  }
}
