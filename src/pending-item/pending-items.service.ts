import { Inject, Injectable } from '@nestjs/common';
import { CreatePendingItem, PendingItem, UpdatePendingItem } from './entities';
import { PendingItemsRepository } from './pending-items.repository';

@Injectable()
export class PendingItemsService {
  constructor(@Inject(PendingItemsRepository) private readonly pendingItemRepository: PendingItemsRepository) {}

  create(userId: string, createPendingItem: CreatePendingItem): PendingItem {
    return this.pendingItemRepository.createPendingItem(userId, createPendingItem);
  }

  findAll(userId: string): PendingItem[] {
    return this.pendingItemRepository.findAllPendingItems(userId);
  }

  findOne(userId: string, id: string): PendingItem {
    return this.pendingItemRepository.findPendingItem(userId, id);
  }

  update(userId: string, id: string, updatePendingItemDto: UpdatePendingItem): PendingItem {
    return this.pendingItemRepository.updatePendingItem(userId, id, updatePendingItemDto);
  }

  remove(userId: string, id: string): void {
    this.pendingItemRepository.deletePendingItem(userId, id);
  }
}
