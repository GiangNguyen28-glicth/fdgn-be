import { Repository } from 'typeorm';
import { IBaseCurdTypeOrm } from '@fdgn/typeorm';
import { BuyerEntity } from '../../../infra';

export interface IBuyerRepo extends IBaseCurdTypeOrm<BuyerEntity, Repository<BuyerEntity>> {}
