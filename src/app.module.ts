import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PendingItemsModule } from './pending-item/pending-items.module';
import { DatabaseModuleModule } from './database-module/database-module.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PendingItemsModule,
    DatabaseModuleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
