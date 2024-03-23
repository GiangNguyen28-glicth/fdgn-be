import { Injectable, Inject } from '@nestjs/common';
import { IResponse } from '@fdgn/common';
import { IRoleRepo, ROLE_PROVIDER } from '@fdgn/share-domain';
import { CreateRoleDTO } from './dto';
@Injectable()
export class RoleService {
  constructor(@Inject(ROLE_PROVIDER.MONGO_REPO) private roleRepo: IRoleRepo) {}

  async create(dto: CreateRoleDTO): Promise<IResponse> {
    try {
      const role = await this.roleRepo.insert(dto);
      await this.roleRepo.save(role);
      return { success: true, message: role._id };
    } catch (error) {
      throw error;
    }
  }
}
