import { IRole, RoleType } from '@fdgn/share-ecm';
import { FilterGetAll } from '@fdgn/common';

export class FilterGetOneRole implements Partial<IRole> {
  name?: RoleType;
}

export class FilterGetAllRole extends FilterGetAll implements Partial<IRole> {
  name?: RoleType;
}
