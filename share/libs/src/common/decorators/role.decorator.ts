import { SetMetadata } from '@nestjs/common';
import { Permission, RoleType } from '../const';

export const hasRoles = (hasRoles: RoleType[]) => SetMetadata('roles', hasRoles);
export const hasResource = (hasResources: Permission[]) => SetMetadata('resources', hasResources);
