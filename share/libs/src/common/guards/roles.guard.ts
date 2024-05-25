import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';
import { Permission, RESOURCE_KEY, ROLES_KEY } from '../const';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required_roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const required_resources = this.reflector.getAllAndOverride<string[]>(RESOURCE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest();
    const token = req.get('authorization');
    const role_params = required_roles
      .map(role => {
        return `roles=${role}`;
      })
      .join('&');
    console.log(role_params);
    const response = await axios.get(`http://localhost:4016/identity/users/get-permission?${role_params}`, {
      headers: { Authorization: token },
    });
    const user_resources: any[] = await response.data;
    return user_resources.some(
      resource => resource.rs_permission === Permission.ALL || required_resources.includes(resource.rs_permission),
    );
  }
}
