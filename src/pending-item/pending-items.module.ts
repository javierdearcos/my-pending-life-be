import { Module } from '@nestjs/common';
import { PendingItemsService } from './pending-items.service';
import { PendingItemsController } from './pending-items.controller';
import { PendingItemsRepository } from './pending-items.repository';
import { InMemoryPendingItemsRepository } from './in-memory-pending-items.repository';
import { DatabasePendingItemsRepository } from './database-pending-items.repository'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendingItem } from './entities';

const PendingItemsRepositoryProvider = {
  provide: PendingItemsRepository,
  useClass:
    process.env.NODE_ENV === 'dev' ? InMemoryPendingItemsRepository : DatabasePendingItemsRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([PendingItem])],
  controllers: [PendingItemsController],
  providers: [PendingItemsService, PendingItemsRepositoryProvider],
})
export class PendingItemsModule {}
