import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUser } from './entities/create-user.entity';

@Injectable()
export class UsersService {

    constructor(
        @Inject(UsersRepository)
        private readonly usersRepository: UsersRepository
    ) {}

    async createUser(user: CreateUser): Promise<User> {
        return this.usersRepository.createUser(user);
    }

    async findUser(username: string): Promise<User> {
        return this.usersRepository.findUser(username);
    }
}
