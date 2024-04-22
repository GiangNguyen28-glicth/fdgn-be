import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { toKeyword } from '@fdgn/common';
import { CateMongoRepoProvider, Category, CategorySchema } from '@fdgn/share-domain';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          CategorySchema.pre('save', function (next) {
            this.keyword = toKeyword(this.name) + ' ' + this._id;
            this.slug = this.keyword.replace(/ /g, '-');
            return next();
          });
          return CategorySchema;
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CateMongoRepoProvider],
})
export class CategoryModule {}
