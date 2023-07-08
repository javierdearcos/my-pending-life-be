import { Module } from '@nestjs/common';
import { PendingItemsService } from './pending-items.service';
import { PendingItemsController } from './pending-items.controller';
import { PendingItemsRepository } from './pending-items.repository';
import { InMemoryPendingItemsRepository } from './in-memory-pending-items.repository';

process.env.NODE_ENV = 'dev';

const PendingItemsRepositoryProvider = {
  provide: PendingItemsRepository,
  useClass:
    process.env.NODE_ENV === 'dev' ? InMemoryPendingItemsRepository : null,
};

@Module({
  controllers: [PendingItemsController],
  providers: [PendingItemsService, PendingItemsRepositoryProvider],
})
export class PendingItemsModule {}
