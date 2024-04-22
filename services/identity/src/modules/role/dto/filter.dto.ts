import { Role, RoleType } from '@fdgn/share-domain';
import { FilterGetAll } from '@fdgn/common';

export class FilterGetOneRole implements Partial<Role> {
  name?: RoleType;
}

export class FilterGetAllRole extends FilterGetAll implements Partial<Role> {
  name?: RoleType;
}
