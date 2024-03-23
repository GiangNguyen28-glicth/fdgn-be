import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { IMailConfig, ISendMail } from './interfaces';

@Injectable()
export class MailService {
  private config: IMailConfig;
  constructor(private jwtService: JwtService, private configService: ConfigService) {
    this.config = this.configService.get<IMailConfig>('mail') as any;
  }

  transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      service: this.config.service,
      auth: {
        user: this.config.userName,
        pass: this.config.password, // naturally, replace both with your real credentials or an application-specific password
      },
    });
  }
  async sendMail(payload: ISendMail): Promise<SMTPTransport.SentMessageInfo> {
    console.log('Processing send to mail: ', payload.to);
    payload.from = this.config.userName;
    return await this.transporter().sendMail(payload);
  }

  async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException("Can't decode this token");
    } catch (error) {
      throw error;
    }
  }
}
