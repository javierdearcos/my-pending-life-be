import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingItem } from './create-pending-item.entity';

export class UpdatePendingItem extends PartialType(CreatePendingItem) {
  status: string;
  prioritized: boolean;
}
