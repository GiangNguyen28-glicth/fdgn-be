import { IEntity, MongoID, Transform } from '@fdgn/common';
import { Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.entities';
import { RegisterType } from '../common/const';

export type UserModel = Model<User>;

@Schema({ timestamps: true })
export class User implements IEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  email: string;

  @Prop({ trim: true })
  password: string;

  @Prop({ type: MongoID, ref: Role.name })
  role: string | Role;

  @Prop({ type: String, trim: true, enum: Object.values(RegisterType) })
  registerType: RegisterType;

  @Prop()
  isConfirmMail: boolean;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  keyword: string;

  @Prop({ default: null })
  deletedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
