import { Injectable } from '@nestjs/common';
import { PendingItem, Status } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PendingItemsRepository } from './pending-items.repository';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DbPendingItemsRepository implements PendingItemsRepository {

  constructor(
    @InjectRepository(PendingItem) private readonly repository: Repository<PendingItem>
  ) {}

  findAllPendingItems(user: User): Promise<PendingItem[]> {
    console.log(`Find in the database pending items from user ${user.id}`);
    return this.repository.findBy({
      user
    });
  }
  findPendingItem(user: User, id: string): Promise<PendingItem> {
    return this.repository.findOneBy({
      id,
      user
    });
  }
  
  createPendingItem(user: User, pendingItem: PendingItem): Promise<PendingItem> {
    return this.repository.save({
      ...pendingItem,
      user
    });
  }

  async updatePendingItem(user: User, id: string, pendingItem: PendingItem): Promise<PendingItem> {
    const pendingItemToUpdate = await this.repository.findOneBy({
      id,
      user
    });

    const updatedPendingItem = await this.repository.preload({
      ...pendingItemToUpdate,
      ...pendingItem,
      id,
      user,
    });

    return this.repository.save(updatedPendingItem);
  }
  deletePendingItem(user: User, id: string): void {
    this.repository.delete({
      user,
      id
    });
  }
  
}
