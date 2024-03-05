import { DBS_TYPE, ICrudRepo } from '@fdgn/common';
import { MongoRepo } from '@fdgn/mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Resource, ResourceModel } from '../entities';

export const RESOURCE_PROVIDER = {
  MONGO_REPO: Resource.name.toUpperCase() + '_' + DBS_TYPE.MONGO,
};

export interface IResourceRepo extends ICrudRepo<Resource> {}

export class ResourceMongoRepo extends MongoRepo<Resource> {
  constructor(
    @InjectModel(Resource.name)
    protected resourceRepo: ResourceModel,
  ) {
    super(resourceRepo);
  }
}
export const ResourceMongoProvider = {
  provide: RESOURCE_PROVIDER.MONGO_REPO,
  useClass: ResourceMongoRepo,
};
