import { Global, Module } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';
import { WsStrategy } from '../../common';
import { SocketConsumer } from './socket.consumer';
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [SocketGateway, WsStrategy, SocketConsumer],
  exports: [SocketGateway],
})
export class SocketModule {}
