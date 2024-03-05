import { IEntity, MongoID, Transform } from '@fdgn/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Resource } from './resource.entities';

export type RoleModel = Model<Role>;

@Schema({ _id: false })
export class Grant {
  @Prop({ trim: true, type: [String] })
  actions: string[];

  @Prop({ trim: true })
  attributes: string;

  @Prop({ type: MongoID, ref: Resource.name })
  resource: string | Resource;
}

@Schema({ timestamps: true })
export class Role implements IEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop([{ type: Grant, default: [] }])
  grants: Grant[];

  @Prop({ default: null })
  deletedAt?: Date;

  updatedAt?: Date;
  createdAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
