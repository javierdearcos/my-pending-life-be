import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.enum';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class PendingItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('uuid')
  userId: string;
  @ManyToOne(() => User, user => user.pendingItems)
  @JoinColumn()
  user: User;
  @Column('text')
  name: string;
  @Column('text')
  description?: string;
  @Column('numeric')
  numberOfHours: number;
  @Column({
    nullable: true,
    type: 'numeric'
  })
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
  @Column({
    nullable: true,
    type: 'date'
  })
  modifiedAt?: Date;
  @Column({
    nullable: true,
    type: 'date'
  })
  prioritizedAt?: Date;
  @Column({
    nullable: true,
    type: 'date'
  })
  finishedAt?: Date;
}
