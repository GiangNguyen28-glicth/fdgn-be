import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@fdgn/rabbitmq';
import { CommonModule, LogModule } from '@fdgn/common';
import { SocketModule } from './modules';

@Module({
  imports: [CommonModule, LogModule, RabbitMQModule, SocketModule],
})
export class AppModule {}
