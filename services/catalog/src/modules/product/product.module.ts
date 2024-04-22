import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductMongoRepoProvider, ProductSchema, AuthMiddleware } from '@fdgn/share-domain';
import { toKeyword } from '@fdgn/common';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          ProductSchema.pre('save', function (next) {
            this.keyword = toKeyword(this.title) + ' ' + this._id;
            this.slug = this.keyword.replace(/ /g, '-');
            return next();
          });
          return ProductSchema;
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductMongoRepoProvider],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
