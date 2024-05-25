import { InjectModel } from '@nestjs/mongoose';

import { MongoRepo } from '@fdgn/mongoose';

import { REPO } from '../../common';
import { IBillingRepo } from '../../domain';
import { BillingEntity, BillingModel } from '../entities';

export class BillingRepo extends MongoRepo<BillingEntity> implements IBillingRepo {
  constructor(
    @InjectModel('billings')
    protected billingModel: BillingModel,
  ) {
    super(billingModel);
  }
}

export const BillingRepoProvider = {
  provide: REPO.BILLING,
  useClass: BillingRepo,
};
