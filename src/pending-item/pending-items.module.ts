import { Module } from '@nestjs/common';
import { PendingItemsService } from './pending-items.service';
import { PendingItemsController } from './pending-items.controller';
import { PendingItemsRepository } from './pending-items.repository';

@Module({
  controllers: [PendingItemsController],
  providers: [PendingItemsService, PendingItemsRepository]
})
export class PendingItemsModule {}
