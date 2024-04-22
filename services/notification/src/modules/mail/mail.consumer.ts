import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RabbitConsumer } from '@fdgn/rabbitmq';

import { ISendMail } from './interfaces';
import { MailService } from './mail.service';

@Injectable()
export class SendMailConsumer extends RabbitConsumer<ISendMail> {
  constructor(protected configService: ConfigService, private mailService: MailService) {
    super(SendMailConsumer.name, configService.get('mailConsume.sendMail') as any);
  }

  async process(source: ISendMail): Promise<void> {
    await this.mailService.sendMail(source);
    console.log(`Send mail to ${source.to} success`);
  }
}
