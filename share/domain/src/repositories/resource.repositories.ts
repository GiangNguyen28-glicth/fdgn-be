import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { TypeOrmRepo } from '@fdgn/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Resource } from '../entities';

export const RESOURCE_PROVIDER = {
  TYPE_ORM_REPO: Resource.name.toUpperCase() + '_' + DBS_TYPE.TYPE_ORM,
};

export interface IResourceRepo extends ICrudRepo<Resource> {}

export class ResourceTypeOrmRepo extends TypeOrmRepo<Resource> {
  constructor(
    @InjectRepository(Resource)
    protected resourceRepo: Repository<Resource>,
  ) {
    super(resourceRepo);
  }
}
export const ResourceTypeOrmProvider = {
  provide: RESOURCE_PROVIDER.TYPE_ORM_REPO,
  useClass: ResourceTypeOrmRepo,
};
