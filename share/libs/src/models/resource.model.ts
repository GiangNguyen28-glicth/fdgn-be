import { IAuditable, IEntity } from '@fdgn/common';
import { Permission } from '../common';
import { IRole } from './role.model';

export interface IResource extends IAuditable {
  id: number;

  name: string;

  permission: Permission;

  roles: IRole[];

  description: string;

  updated_by_attribute: string[];

  read_by_attribute: string[];
}
