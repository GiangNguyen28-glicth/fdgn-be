import { IAuditable } from '@fdgn/common';
import { RoleType } from '../common';
import { IResource } from './resource.model';
import { IUser } from './user.model';

export interface IRole extends IAuditable {
  id: number;

  name: RoleType;

  users: IUser[];

  resources: IResource[];
}
