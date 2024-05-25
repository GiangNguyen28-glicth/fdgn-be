import { InjectModel } from '@nestjs/mongoose';

import { Notification, NotificationModel } from '@fdgn/share-ecm';
import { MongoRepo } from '@fdgn/mongoose';

import { INotificationRepo } from '../../domain';
import { REPO } from '../../common';

export class NotificationRepo extends MongoRepo<Notification> implements INotificationRepo {
  constructor(
    @InjectModel(Notification.name)
    protected notificationRepo: NotificationModel,
  ) {
    super(notificationRepo);
  }
}

export const NotificationRepoProvider = {
  provide: REPO.NOTIFICATION,
  useClass: NotificationRepo,
};
