import { Repository } from 'typeorm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { RoleEntity } from '../../infra';

export interface IRoleRepo extends IBaseCurdTypeOrm<RoleEntity, Repository<RoleEntity>> {}
