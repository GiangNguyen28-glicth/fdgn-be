import { IBaseCurdMongo } from '@fdgn/mongoose';
import { BillingEntity, BillingModel } from '../../infra';

export interface IBillingRepo extends IBaseCurdMongo<BillingEntity, BillingModel> {}
