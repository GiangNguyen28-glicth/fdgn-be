import { Injectable, Inject } from '@nestjs/common';
import { IResponse, FilterBuilder, DBS_TYPE } from '@fdgn/common';
import { IRoleRepo, ROLE_PROVIDER, Role } from '@fdgn/share-domain';

import { CreateRoleDTO, FilterGetAllRole, FilterGetOneRole } from './dto';
const dbsType = DBS_TYPE.TYPE_ORM;

@Injectable()
export class RoleService {
  constructor(@Inject(ROLE_PROVIDER.TYPE_ORM_REPO) private roleRepo: IRoleRepo) {}

  async create(dto: CreateRoleDTO): Promise<IResponse> {
    try {
      const role = await this.roleRepo.insert({ entity: dto });
      await this.roleRepo.save({ entity: role });
      return { success: true, message: role.id.toString() };
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: FilterGetAllRole): Promise<Role[]> {
    try {
      const { filters } = new FilterBuilder<Role>()
        .getInstance(dbsType)
        .setFilterItem('id', '$in', dto?.ids)
        .buildQuery();
      return await this.roleRepo.findAll({ filters });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(dto: FilterGetOneRole): Promise<Role> {
    const { filters } = new FilterBuilder<Role>()
      .getInstance(dbsType)
      .setFilterItem('name', '$eq', dto?.name)
      .buildQuery();
    return await this.roleRepo.findOne({ filters });
  }
}
