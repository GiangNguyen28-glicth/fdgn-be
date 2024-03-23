import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Resource, ResourceMongoProvider, ResourceSchema } from '@fdgn/share-domain';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Resource.name,
        schema: ResourceSchema,
      },
    ]),
  ],
  controllers: [ResourceController],
  providers: [ResourceMongoProvider, ResourceService],
})
export class ResourceModule {}
