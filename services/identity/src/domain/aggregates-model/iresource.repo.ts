import { Repository } from 'typeorm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { ResourceEntity } from '../../infra';

export interface IResourceRepo extends IBaseCurdTypeOrm<ResourceEntity, Repository<ResourceEntity>> {}
