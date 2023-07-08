import { Inject, Injectable } from '@nestjs/common';
import { CreatePendingItem, PendingItem, Status, UpdatePendingItem } from './entities';
import { PendingItemsRepository } from './pending-items.repository';

@Injectable()
export class PendingItemsService {
  constructor(
    @Inject(PendingItemsRepository)
    private readonly pendingItemRepository: PendingItemsRepository,
  ) {}

  create(userId: string, createPendingItem: CreatePendingItem): PendingItem {
    return this.pendingItemRepository.createPendingItem(userId, {
      id: null,
      userId,
      ...createPendingItem,
      status: Status.TO_DO,
      prioritized: false,
      createdAt: new Date(),
    });
  }

  findAll(userId: string): PendingItem[] {
    return this.pendingItemRepository.findAllPendingItems(userId);
  }

  findOne(userId: string, id: string): PendingItem {
    return this.pendingItemRepository.findPendingItem(userId, id);
  }

  update(
    userId: string,
    id: string,
    updatePendingItemDto: UpdatePendingItem,
  ): PendingItem {
    const pendingItemToUpdate = this.pendingItemRepository.findPendingItem(
      userId,
      id,
    );

    return this.pendingItemRepository.updatePendingItem(userId, id, {
      ...pendingItemToUpdate,
      ...updatePendingItemDto,
      status: this.toStatus(updatePendingItemDto.status, pendingItemToUpdate.status),
      modifiedAt: new Date(),
      prioritizedAt: updatePendingItemDto.prioritized ? new Date() : null,
      finishedAt:
        updatePendingItemDto.status === Status.FINISHED ? new Date() : null,
    });
  }

  private toStatus(statusAsString: string, fallbackStatus: Status): Status {
    if (!statusAsString) {
      return fallbackStatus;
    }

    switch(statusAsString) {
      case 'To Do':
        return Status.TO_DO;
      case 'In Progress':
        return Status.IN_PROGRESS;
      case 'Finished':
        return Status.FINISHED;
      default:
        throw new Error(`Invalid status ${statusAsString}`);
    }
  }

  remove(userId: string, id: string): void {
    this.pendingItemRepository.deletePendingItem(userId, id);
  }
}
