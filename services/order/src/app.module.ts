import { Module } from '@nestjs/common';

import { CommonModule, LogModule } from '@fdgn/common';
import { AppController } from './app.controller';

@Module({
  imports: [CommonModule],
  controllers: [AppController],
})
export class AppModule {}
