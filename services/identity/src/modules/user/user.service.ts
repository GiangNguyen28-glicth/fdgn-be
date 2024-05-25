import { Inject, Injectable } from '@nestjs/common';

import { IResult, IUpdateOptions, formatResult, throwIfNotExists } from '@fdgn/common';
import { IUser, RoleType } from '@fdgn/share-ecm';
import { FilterTypeOrmBuilder } from '@fdgn/typeorm';

import { REPO } from '../../common/constance';
import { IUserRepo } from '../../domain';
import { CreateUserDTO, FilterGetAllUser, FilterGetOneUser } from './dto';
import { UserEntity } from '../../infra';
@Injectable()
export class UserService {
  constructor(@Inject(REPO.USER) private userRepo: IUserRepo) {}

  async create(dto: CreateUserDTO): Promise<UserEntity> {
    try {
      const user = await this.userRepo.insert({ entity: dto });
      await this.userRepo.save({ entity: dto });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(filter: FilterGetAllUser): Promise<IResult<UserEntity>> {
    try {
      const [results, totalCount] = await Promise.all([this.userRepo.findAll(), this.userRepo.count()]);
      return formatResult(results, totalCount);
    } catch (error) {
      throw error;
    }
  }

  async findOne(filters_query: FilterGetOneUser): Promise<UserEntity> {
    try {
      const { filters } = new FilterTypeOrmBuilder<IUser>()
        .setFilterItem('id', '$eq', filters_query?.id)
        .setFilterItem('email', '$eq', filters_query?.email)
        .buildQuery();
      const user = await this.userRepo.findOne({ filters, relations: ['roles'], fields: ['id', 'roles', 'password'] });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
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
      throw error;
    }
  }

  async updateOne(options: IUpdateOptions<UserEntity>): Promise<UserEntity> {
    try {
      const { filters: filters_query, session, entity } = options;
      const { filters } = new FilterTypeOrmBuilder<IUser>().setFilterItem('id', '$eq', filters_query?.id).buildQuery();
      if (session) {
        return await this.userRepo.findOneAndUpdate({ filters, entity, session });
      }
      return await this.userRepo.findOneAndUpdate({ filters, entity });
    } catch (error) {
      throw error;
    }
  }
}
