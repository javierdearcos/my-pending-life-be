import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbUsersRepository } from './db-users.repository';
import { InMemoryUsersRepository } from './in-memory-users.repository';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const UsersRepositoryProvider = {
  provide: UsersRepository,
  useClass:
    process.env.NODE_ENV === 'dev' ? InMemoryUsersRepository : DbUsersRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersRepositoryProvider, UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
