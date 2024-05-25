import { IBaseEntity } from '@fdgn/common';
import { RegisterType } from '../common';
import { IRole } from './role.model';
import { IShop } from './shop.model';

export interface IUser extends IBaseEntity {
  id: number;

  name: string;

  email: string;

  password: string;

  register_type: RegisterType;

  roles: IRole[];

  shop: IShop;

  is_confirm_mail: boolean;

  slug: string;

  keyword: string;
}
