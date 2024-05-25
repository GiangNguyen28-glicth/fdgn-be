import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Transform } from '@fdgn/common';
import { DomainEventStatus, ILogEvent } from '@fdgn/share-ecm';

export type LogEventModel = Model<LogEventEntity>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class LogEventEntity implements ILogEvent {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  request_id: string;

  @Prop()
  transaction_id: string;

  @Prop()
  event_name: string;

  @Prop()
  event_content: string;

  @Prop()
  context: string;

  @Prop({ type: String, enum: Object.values(DomainEventStatus) })
  status: DomainEventStatus;

  @Prop({ nullable: true })
  error?: string;

  created_at?: Date;

  updated_at?: Date;
}

export const LogEventSchema = SchemaFactory.createForClass(LogEventEntity);
