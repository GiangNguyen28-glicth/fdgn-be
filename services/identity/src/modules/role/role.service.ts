import { Inject, Injectable } from '@nestjs/common';

import { IResponse } from '@fdgn/common';
import { FilterTypeOrmBuilder } from '@fdgn/typeorm';

import { REPO } from '../../common';
import { IRoleRepo } from '../../domain';
import { CreateRoleDTO, FilterGetAllRole, FilterGetOneRole } from './dto';
import { RoleEntity } from '../../infra';

@Injectable()
export class RoleService {
  constructor(@Inject(REPO.ROLE) private roleRepo: IRoleRepo) {}

  async create(dto: CreateRoleDTO): Promise<IResponse> {
    try {
      const role = await this.roleRepo.insert({ entity: dto });
      await this.roleRepo.save({ entity: role });
      return { success: true, message: role.id.toString() };
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: FilterGetAllRole): Promise<RoleEntity[]> {
    try {
      const { filters } = new FilterTypeOrmBuilder<RoleEntity>().setFilterItem('id', '$in', dto?.ids).buildQuery();
      return await this.roleRepo.findAll({ filters });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(dto: FilterGetOneRole): Promise<RoleEntity> {
    const { filters } = new FilterTypeOrmBuilder<RoleEntity>().setFilterItem('name', '$eq', dto?.name).buildQuery();
    return await this.roleRepo.findOne({ filters });
  }
}
