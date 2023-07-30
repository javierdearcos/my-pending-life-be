import { User } from 'src/users/entities/user.entity';
import { PendingItem } from './entities';

export interface PendingItemsRepository {
  findAllPendingItems(user: User): Promise<PendingItem[]>;
  findPendingItem(user: User, id: string): Promise<PendingItem>;
  createPendingItem(user: User, pendingItem: PendingItem): Promise<PendingItem>;
  updatePendingItem(
    user: User,
    id: string,
    pendingItem: PendingItem,
  ): Promise<PendingItem>;
  deletePendingItem(user: User, id: string): void;
}

export const PendingItemsRepository = Symbol('PendingItemsRepository');
