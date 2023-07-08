import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingItemDto } from './create-pending-item.dto';
import { IsEnum } from 'class-validator';

export class UpdatePendingItemDto extends PartialType(CreatePendingItemDto) {
  status: string;
  prioritized: boolean;
}
