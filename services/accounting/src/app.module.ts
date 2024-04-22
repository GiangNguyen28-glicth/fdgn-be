import { Module } from '@nestjs/common';
import { MongoDBModule } from '@fdgn/mongoose';
import { CommonModule, LogModule } from '@fdgn/common';
import { AppController } from './app.controller';
@Module({
  imports: [CommonModule, MongoDBModule, LogModule],
  controllers: [AppController],
})
export class AppModule {}
