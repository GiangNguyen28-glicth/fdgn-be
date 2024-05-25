import { DomainEventStatus, ILogEvent } from '@fdgn/share-ecm';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'log_events' })
export class LogEventEntity implements ILogEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request_id: string;

  @Column()
  transaction_id: string;

  @Column()
  event_name: string;

  @Column()
  event_content: string;

  @Column()
  context: string;

  @Column({ type: 'enum', enum: Object.values(DomainEventStatus), nullable: true })
  status: DomainEventStatus;

  @Column({ nullable: true })
  error?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
