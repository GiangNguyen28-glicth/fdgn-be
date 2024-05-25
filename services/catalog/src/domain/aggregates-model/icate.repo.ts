import { IBaseCurdMongo } from '@fdgn/mongoose';
import { CateModel, CategoryEntity } from '../../infra';

export interface ICateRepo extends IBaseCurdMongo<CategoryEntity, CateModel> {}
