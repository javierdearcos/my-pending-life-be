import { Status } from './status.enum';

export class PendingItem {
  id: string;
  userId: string;
  name: string;
  description?: string;
  numberOfHours: number;
  cost?: number;
  status: Status;
  prioritized: boolean;
  createdAt: Date;
  modifiedAt?: Date;
  prioritizedAt?: Date;
  finishedAt?: Date;
}
