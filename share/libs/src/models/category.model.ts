import { IBaseEntity } from '@fdgn/common';

export interface ICategory extends IBaseEntity {
  _id: string;

  name: string;

  level: number;

  parent_id: string | ICategory;

  deleted_at?: Date;

  slug: string;

  keyword: string;
}
