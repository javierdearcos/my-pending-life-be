import { Inject, Injectable } from '@nestjs/common';
import { CreatePendingItem, PendingItem, Status, UpdatePendingItem } from './entities';
import { PendingItemsRepository } from './pending-items.repository';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PendingItemsService {
  constructor(
    @Inject(PendingItemsRepository)
    private readonly pendingItemRepository: PendingItemsRepository,
  ) {}

  async create(user: User, createPendingItem: CreatePendingItem): Promise<PendingItem> {
    return this.pendingItemRepository.createPendingItem(user, {
      user,
      ...createPendingItem,
      status: Status.TO_DO,
      prioritized: false,
      createdAt: new Date(),
    });
  }

  async findAll(user: User): Promise<PendingItem[]> {
    return this.pendingItemRepository.findAllPendingItems(user);
  }

  async findOne(user: User, id: string): Promise<PendingItem> {
    return this.pendingItemRepository.findPendingItem(user, id);
  }

  async update(
    user: User,
    id: string,
    updatePendingItemDto: UpdatePendingItem,
  ): Promise<PendingItem> {
    const pendingItemToUpdate = await this.pendingItemRepository.findPendingItem(
      user,
      id,
    );

    return this.pendingItemRepository.updatePendingItem(user, id, {
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

  remove(user: User, id: string): void {
    this.pendingItemRepository.deletePendingItem(user, id);
  }
}
