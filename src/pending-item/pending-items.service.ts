import { Inject, Injectable } from '@nestjs/common';
import { CreatePendingItem, PendingItem, Status, UpdatePendingItem } from './entities';
import { PendingItemsRepository } from './pending-items.repository';

@Injectable()
export class PendingItemsService {
  constructor(
    @Inject(PendingItemsRepository)
    private readonly pendingItemRepository: PendingItemsRepository,
  ) {}

  async create(userId: string, createPendingItem: CreatePendingItem): Promise<PendingItem> {
    return this.pendingItemRepository.createPendingItem(userId, {
      userId,
      ...createPendingItem,
      status: Status.TO_DO,
      prioritized: false,
      createdAt: new Date(),
    });
  }

  async findAll(userId: string): Promise<PendingItem[]> {
    return this.pendingItemRepository.findAllPendingItems(userId);
  }

  async findOne(userId: string, id: string): Promise<PendingItem> {
    return this.pendingItemRepository.findPendingItem(userId, id);
  }

  async update(
    userId: string,
    id: string,
    updatePendingItemDto: UpdatePendingItem,
  ): Promise<PendingItem> {
    const pendingItemToUpdate = await this.pendingItemRepository.findPendingItem(
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
