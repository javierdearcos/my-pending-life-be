import { CreatePendingItem, PendingItem, UpdatePendingItem } from "./entities";

export interface PendingItemsRepository {
    findAllPendingItems(): PendingItem[];
    findPendingItem(id: string): PendingItem ;
    createPendingItem(pendingItem: CreatePendingItem): PendingItem;
    updatePendingItem(id: string, pendingItem: UpdatePendingItem): PendingItem;
    deletePendingItem(id: string): void;
}

export const PendingItemsRepository = Symbol('PendingItemsRepository');