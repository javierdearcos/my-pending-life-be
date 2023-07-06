import { CreatePendingItem, PendingItem, UpdatePendingItem } from "./entities";

export interface PendingItemsRepository {
    findAllPendingItems(userId: string): PendingItem[];
    findPendingItem(userId: string, id: string): PendingItem ;
    createPendingItem(userId: string, pendingItem: CreatePendingItem): PendingItem;
    updatePendingItem(userId: string, id: string, pendingItem: UpdatePendingItem): PendingItem;
    deletePendingItem(userId: string, id: string): void;
}

export const PendingItemsRepository = Symbol('PendingItemsRepository');