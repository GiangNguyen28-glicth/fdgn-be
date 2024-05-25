import { RoleEntity, UserEntity } from '../../../infra';

export class CreateUserDTO implements Partial<UserEntity> {
  name?: string;
  email?: string;
  password?: string;
  roles?: RoleEntity[];
}
