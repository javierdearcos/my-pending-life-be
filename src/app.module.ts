import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PendingItemsModule } from './pending-item/pending-items.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PendingItemsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
