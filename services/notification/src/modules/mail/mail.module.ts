import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { SendMailConsumer } from './mail.consumer';

@Global()
@Module({
  controllers: [MailController],
  providers: [MailService, JwtService, SendMailConsumer],
  exports: [MailService],
})
export class MailModule {}
