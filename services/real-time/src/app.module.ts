import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@fdgn/rabbitmq';
import { CommonModule, LogModule, HttpModule } from '@fdgn/common';
import { SocketModule } from './modules';

@Module({
  imports: [CommonModule, LogModule, RabbitMQModule, SocketModule, HttpModule],
})
export class AppModule {}
