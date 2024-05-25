import { Repository } from 'typeorm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { ShopEntity } from '../../infra';

export interface IShopRepo extends IBaseCurdTypeOrm<ShopEntity, Repository<ShopEntity>> {}
