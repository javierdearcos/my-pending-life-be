import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class PendingItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  userId: string;
  @Column('text')
  name: string;
  @Column('text')
  description?: string;
  @Column('numeric')
  numberOfHours: number;
  @Column('numeric')
  cost?: number;
  @Column({
    type: 'enum',
    enum: [Status.TO_DO, Status.IN_PROGRESS, Status.FINISHED]
  })
  status: Status;
  @Column('boolean')
  prioritized: boolean;
  @Column('date')
  createdAt: Date;
  @Column('date')
  modifiedAt?: Date;
  @Column('date')
  prioritizedAt?: Date;
  @Column('date')
  finishedAt?: Date;
}
