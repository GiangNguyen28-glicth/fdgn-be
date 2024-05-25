import { Controller } from '@nestjs/common';
import { Notification } from '@fdgn/share-ecm';
import { NotificationService } from './notification.service';

@Controller(Notification.name.toLowerCase())
export class NotificationController {
  constructor(private notiService: NotificationService) {}
}
