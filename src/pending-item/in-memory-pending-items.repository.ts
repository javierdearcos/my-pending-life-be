import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PendingItem, Status } from './entities';
import { PendingItemsRepository } from './pending-items.repository';

@Injectable()
export class InMemoryPendingItemsRepository implements PendingItemsRepository {
  private pendingItems: PendingItem[] = [
    {
      id: '69b23172-b1ed-40c3-a5f9-78ee1574342a',
      userId: 'f97be3f5-4af3-419b-bb56-8520f0a49ce6',
      name: 'Mindset',
      description: 'Read the Mindset book by Carol S. S. Dweck',
      numberOfHours: 12,
      cost: 12,
      status: Status.IN_PROGRESS,
      prioritized: true,
      createdAt: new Date(),
      modifiedAt: new Date(),
      prioritizedAt: new Date(),
    },
    {
      id: 'bbd020d9-b989-4e4c-9b00-7a4cee75257b',
      userId: 'f97be3f5-4af3-419b-bb56-8520f0a49ce6',
      name: 'Mass Effect 2',
      description: 'Finish Mass Effect 2 videogame',
      numberOfHours: 24,
      cost: 40,
      status: Status.TO_DO,
      prioritized: false,
      createdAt: new Date(),
    },
    {
      id: '9473e378-c658-4dee-b34b-78a756e3c958',
      userId: 'f97be3f5-4af3-419b-bb56-8520f0a49ce6',
      name: 'Homeland',
      description: 'Finish TV Show homeland',
      numberOfHours: 4,
      cost: 10,
      status: Status.TO_DO,
      prioritized: false,
      createdAt: new Date(),
    },
  ];

  findAllPendingItems(userId: string): Promise<PendingItem[]> {
    return Promise.resolve(this.pendingItems.filter(
      (pendingItem) => pendingItem.userId === userId,
    ));
  }

  findPendingItem(userId: string, id: string): Promise<PendingItem> {
    const pendingItem = this.pendingItems.find(
      (pendingItem) => pendingItem.id === id && pendingItem.userId === userId,
    );

    if (!pendingItem) {
      throw Error(`Pending item ${id} not found`);
    }

    return Promise.resolve(pendingItem);
  }

  createPendingItem(userId: string, pendingItem: PendingItem): Promise<PendingItem> {
    this.pendingItems.push({
      ...pendingItem,
      id: uuidv4(),
      userId: userId,
    });

    return Promise.resolve(this.pendingItems[this.pendingItems.length - 1]);
  }

  updatePendingItem(
    userId: string,
    id: string,
    pendingItem: PendingItem,
  ): Promise<PendingItem> {
    let pendingItemToUpdate = this.pendingItems.find(
      (pendingItem) => pendingItem.id === id && pendingItem.userId === userId,
    );

    if (!pendingItemToUpdate) {
      throw Error(`Pending item ${id} not found`);
    }

    pendingItemToUpdate = {
      ...pendingItemToUpdate,
      ...pendingItem,
    };

    this.pendingItems = this.pendingItems.filter(
      (pendingItem) => pendingItem.id !== id,
    );
    this.pendingItems.push(pendingItemToUpdate);

    return Promise.resolve(pendingItemToUpdate);
  }

  deletePendingItem(userId: string, id: string): void {
    const pendingItem = this.pendingItems.find(
      (pendingItem) => pendingItem.id === id && pendingItem.userId === userId,
    );

    if (!pendingItem) {
      return;
    }

    this.pendingItems = this.pendingItems.filter(
      (pendingItem) => pendingItem.id !== id,
    );
  }
}
