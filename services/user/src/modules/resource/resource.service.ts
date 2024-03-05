import { Injectable, Inject } from '@nestjs/common';
import { IResourceRepo, RESOURCE_PROVIDER } from '@fdgn/share-domain';
import { IResponse } from '@fdgn/common';
import { CreateResourceDTO } from './dto';
@Injectable()
export class ResourceService {
  constructor(@Inject(RESOURCE_PROVIDER.MONGO_REPO) private resourceRepo: IResourceRepo) {}

  async create(dto: CreateResourceDTO): Promise<IResponse> {
    try {
      const resource = await this.resourceRepo.insert(dto);
      await this.resourceRepo.save(resource);
      return { success: true, message: resource._id };
    } catch (error) {
      throw error;
    }
  }
}
