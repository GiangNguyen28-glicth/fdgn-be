import { Repository } from 'typeorm';
import { RoleType } from '@fdgn/share-ecm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { UserEntity } from '../../infra';

export interface IUserRepo extends IBaseCurdTypeOrm<UserEntity, Repository<UserEntity>> {
  getUserPermissionByIdAndRole(id: number, name: RoleType[]): unknown;
}
