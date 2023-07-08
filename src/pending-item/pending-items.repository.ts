import { PendingItem } from './entities';

export interface PendingItemsRepository {
  findAllPendingItems(userId: string): PendingItem[];
  findPendingItem(userId: string, id: string): PendingItem;
  createPendingItem(userId: string, pendingItem: PendingItem): PendingItem;
  updatePendingItem(
    userId: string,
    id: string,
    pendingItem: PendingItem,
  ): PendingItem;
  deletePendingItem(userId: string, id: string): void;
}

export const PendingItemsRepository = Symbol('PendingItemsRepository');
