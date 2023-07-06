import { Injectable } from '@nestjs/common';
import { CreatePendingItemDto } from './dto/create-pending-item.dto';
import { UpdatePendingItemDto } from './dto/update-pending-item.dto';
import { PendingItem } from './entities/pending-item.entity';
import { PendingItemsRepository } from './pending-items.repository';

@Injectable()
export class PendingItemsService {
  constructor(private readonly pendingItemRepository: PendingItemsRepository) {}

  create(createPendingItemDto: CreatePendingItemDto): PendingItem {
    return this.pendingItemRepository.createPendingItem(createPendingItemDto)
  }

  findAll(): PendingItem[] {
    return this.pendingItemRepository.findAllPendingItems();
  }

  findOne(id: string): PendingItem {
    return this.pendingItemRepository.findPendingItem(id);
  }

  update(id: string, updatePendingItemDto: UpdatePendingItemDto): PendingItem {
    return this.pendingItemRepository.updatePendingItem(id, updatePendingItemDto);
  }

  remove(id: string): void {
    this.pendingItemRepository.deletePendingItem(id);
  }
}
