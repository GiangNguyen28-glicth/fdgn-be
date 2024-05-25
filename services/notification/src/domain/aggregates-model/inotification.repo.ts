import { IBaseCurdMongo } from '@fdgn/mongoose';
import { Notification, NotificationModel } from '@fdgn/share-ecm';
export interface INotificationRepo extends IBaseCurdMongo<Notification, NotificationModel> {}
