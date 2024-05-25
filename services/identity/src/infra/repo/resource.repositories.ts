import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeOrmRepo } from '@fdgn/typeorm';
import { REPO } from '../../common';
import { IResourceRepo } from '../../domain';
import { ResourceEntity } from '../entities';

export class ResourceRepo extends TypeOrmRepo<ResourceEntity> implements IResourceRepo {
  constructor(
    @InjectRepository(ResourceEntity)
    protected resourceRepo: Repository<ResourceEntity>,
  ) {
    super(resourceRepo);
  }
}
export const ResourceRepoProvider = {
  provide: REPO.RESOURCE,
  useClass: ResourceRepo,
};
