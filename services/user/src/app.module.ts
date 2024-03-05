import { MongoDBModule } from '@fdgn/mongoose';
import { Module } from '@nestjs/common';

import { CommonModule } from '@fdgn/common';

import { ResourceModule, RoleModule, UserModule } from './modules';

@Module({
  imports: [CommonModule, MongoDBModule, UserModule, ResourceModule, RoleModule],
})
export class AppModule {}
