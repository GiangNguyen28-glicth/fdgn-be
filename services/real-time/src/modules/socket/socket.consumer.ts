import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RabbitConsumer } from '@fdgn/rabbitmq';

import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketConsumer extends RabbitConsumer<any> {
  constructor(protected configService: ConfigService, private socketGateway: SocketGateway) {
    super(SocketConsumer.name, configService.get('socketConsumer.eventRealTimeListening') as any);
  }

  async process(source: any): Promise<void> {
    console.log(source);
    // await this.socketGateway.sendEventToClient()
  }
}
