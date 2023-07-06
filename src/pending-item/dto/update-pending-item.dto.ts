import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingItemDto } from './create-pending-item.dto';

export class UpdatePendingItemDto extends PartialType(CreatePendingItemDto) {}
