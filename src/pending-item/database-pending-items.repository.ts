import { Injectable } from '@nestjs/common';
import { PendingItem, Status } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PendingItemsRepository } from './pending-items.repository';

@Injectable()
export class DatabasePendingItemsRepository implements PendingItemsRepository {

  constructor(
    @InjectRepository(PendingItem) private readonly repository: Repository<PendingItem>
  ) {}

  findAllPendingItems(userId: string): Promise<PendingItem[]> {
    return this.repository.findBy({
      userId
    });
  }
  findPendingItem(userId: string, id: string): Promise<PendingItem> {
    return this.repository.findOneBy({
      id,
      userId
    });
  }
  
  createPendingItem(userId: string, pendingItem: PendingItem): Promise<PendingItem> {
    return this.repository.save({
      ...pendingItem,
      userId
    });
  }

  async updatePendingItem(userId: string, id: string, pendingItem: PendingItem): Promise<PendingItem> {
    const pendingItemToUpdate = await this.repository.findOneBy({
      id,
      userId
    });

    const updatedPendingItem = await this.repository.preload({
      ...pendingItemToUpdate,
      ...pendingItem,
      id,
      userId,
    });

    return this.repository.save(updatedPendingItem);
  }
  deletePendingItem(userId: string, id: string): void {
    this.repository.delete({
      userId,
      id
    });
  }
  
}
