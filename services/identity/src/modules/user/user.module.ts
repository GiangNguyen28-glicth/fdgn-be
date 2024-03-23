import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { toKeyword } from '@fdgn/common';
import { User, UserMongoProvider, UserSchema } from '@fdgn/share-domain';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre('save', function (next) {
            if (this.keyword) {
              this.keyword = toKeyword(this.name) + ' ' + this._id;
              this.slug = this.keyword.replace(/' '/g, '-');
            }
            return next();
          });
          return UserSchema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserMongoProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
