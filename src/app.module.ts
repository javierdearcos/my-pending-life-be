import { Module } from '@nestjs/common';
import { PendingItemsModule } from './pending-item/pending-items.module';

@Module({
  imports: [PendingItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
