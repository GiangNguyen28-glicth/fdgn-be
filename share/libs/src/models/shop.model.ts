import { IAuditable } from '@fdgn/common';
import { ShopLevel, ShopStatus } from '../common';
import { IUser } from './user.model';

export interface IShop extends IAuditable {
  id: number;

  name: string;

  level: ShopLevel;

  launch_date: Date;

  total_rating: number;

  rating_score: number;

  user: IUser;

  status: ShopStatus;

  image_url: string;

  keyword: string;

  slug: string;
}
