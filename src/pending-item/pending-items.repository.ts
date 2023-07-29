import { PendingItem } from './entities';

export interface PendingItemsRepository {
  findAllPendingItems(userId: string): Promise<PendingItem[]>;
  findPendingItem(userId: string, id: string): Promise<PendingItem>;
  createPendingItem(userId: string, pendingItem: PendingItem): Promise<PendingItem>;
  updatePendingItem(
    userId: string,
    id: string,
    pendingItem: PendingItem,
  ): Promise<PendingItem>;
  deletePendingItem(userId: string, id: string): void;
}

export const PendingItemsRepository = Symbol('PendingItemsRepository');
