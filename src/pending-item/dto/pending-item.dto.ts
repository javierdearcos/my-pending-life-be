export class PendingItemDto {
  id?: string;
  name: string;
  description?: string;
  numberOfHours: number;
  cost?: number;
  status: string;
  prioritized: boolean;
  createdAt: Date;
  modifiedAt?: Date;
  prioritizedAt?: Date;
  finishedAt?: Date;
}
