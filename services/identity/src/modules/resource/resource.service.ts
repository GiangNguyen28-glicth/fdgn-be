import { Injectable, Inject } from '@nestjs/common';
import { IResourceRepo, RESOURCE_PROVIDER } from '@fdgn/share-domain';
import { IResponse } from '@fdgn/common';

import { CreateResourceDTO } from './dto';
import { RoleService } from '../role';
@Injectable()
export class ResourceService {
  constructor(
    @Inject(RESOURCE_PROVIDER.TYPE_ORM_REPO) private resourceRepo: IResourceRepo,
    private roleService: RoleService,
  ) {}

  async create(dto: CreateResourceDTO): Promise<IResponse> {
    try {
      const roles = await this.roleService.findAll({ ids: dto.roleIds });
      dto['roles'] = roles;
      const resource = await this.resourceRepo.insert({ entity: dto });
      await this.resourceRepo.save({ entity: resource });
      return { success: true, message: resource.id.toString() };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.resourceRepo.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
