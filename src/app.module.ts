import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PendingItemsModule } from './pending-item/pending-items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PendingItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
