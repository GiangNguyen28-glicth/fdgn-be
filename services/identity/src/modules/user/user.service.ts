import { Injectable, Inject } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import {
  IResult,
  formatResult,
  IResponse,
  FilterBuilder,
  DBS_TYPE,
  throwIfNotExists,
  IUpdateOptions,
} from '@fdgn/common';
import { IUserRepo, RoleType, USER_PROVIDER, User } from '@fdgn/share-domain';
import { CreateUserDTO, FilterGetAllUser, FilterGetOneUser } from './dto';
const dbsType: DBS_TYPE = DBS_TYPE.TYPE_ORM;
@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDER.TYPE_ORM_REPO) private userRepo: IUserRepo) {}

  async create(dto: CreateUserDTO): Promise<User> {
    try {
      const user = await this.userRepo.insert({ entity: dto });
      await this.userRepo.save({ entity: dto });
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
        .setFilterItem('id', '$eq', filtersQuery?.id)
        .setFilterItem('email', '$eq', filtersQuery?.email)
        .buildQuery();
      filters['relations'] = ['roles'];
      const user = await this.userRepo.findOne({ filters });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.findOne({ id });
      throwIfNotExists(user, 'User not found !');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserPermissionByIdAndRole(id: number, roles: RoleType[]) {
    try {
      if (typeof roles === 'string') {
        roles = [roles];
      }
      return await this.userRepo.getUserPermissionByIdAndRole(id, roles);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateOne(options: IUpdateOptions<User>): Promise<User> {
    try {
      const { filters: filtersQuery, session, entity } = options;
      const { filters } = new FilterBuilder<User>()
        .getInstance(dbsType)
        .setFilterItem('id', '$eq', filtersQuery?.id)
        .buildQuery();
      if (session) {
        return await this.userRepo.findOneAndUpdate({ filters, entity, session });
      }
      return await this.userRepo.findOneAndUpdate({ filters, entity });
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
