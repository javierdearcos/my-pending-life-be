import { Inject, Injectable } from '@nestjs/common';
import { CreatePendingItem, PendingItem, UpdatePendingItem } from './entities';
import { PendingItemsRepository } from './pending-items.repository';

@Injectable()
export class PendingItemsService {
  constructor(@Inject(PendingItemsRepository) private readonly pendingItemRepository: PendingItemsRepository) {}

  create(createPendingItemDto: CreatePendingItem): PendingItem {
    return this.pendingItemRepository.createPendingItem(createPendingItemDto)
  }

  findAll(): PendingItem[] {
    return this.pendingItemRepository.findAllPendingItems();
  }

  findOne(id: string): PendingItem {
    return this.pendingItemRepository.findPendingItem(id);
  }

  update(id: string, updatePendingItemDto: UpdatePendingItem): PendingItem {
    return this.pendingItemRepository.updatePendingItem(id, updatePendingItemDto);
  }

  remove(id: string): void {
    this.pendingItemRepository.deletePendingItem(id);
  }
}
