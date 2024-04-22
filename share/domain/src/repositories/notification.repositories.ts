import { InjectModel } from '@nestjs/mongoose';

import { ICrudRepo } from '@fdgn/common';
import { MongoRepo } from '@fdgn/mongoose';

import { Notification, NotificationModel } from '../entities';

export const NOTIFICATION_PROVIDER = {
  MONGO_REPO: 'Notification_MONGO_PROVIDER',
};

export interface INotificationRepo extends ICrudRepo<Notification> {}

export class NotificationMongoRepo extends MongoRepo<Notification> {
  constructor(
    @InjectModel(Notification.name)
    protected notificationRepo: NotificationModel,
  ) {
    super(notificationRepo);
  }
}

export const NotificationMongoRepoProvider = {
  provide: NOTIFICATION_PROVIDER.MONGO_REPO,
  useClass: NotificationMongoRepo,
};
