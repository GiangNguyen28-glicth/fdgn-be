import { Module } from '@nestjs/common';

import { CommonModule, LogModule } from '@fdgn/common';
import { RedisClientModule } from '@fdgn/redis';
import { AppController } from './app.controller';
import { CartModule } from './modules';

@Module({
  imports: [CommonModule, RedisClientModule, LogModule, CartModule],
  controllers: [AppController],
})
export class AppModule {}
