import { Injectable } from '@nestjs/common';

export type User = {
    id: number,
    username: string,
    password: string
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
          id: 1,
          username: 'john',
          password: 'doe',
        },
        {
          id: 2,
          username: 'jane',
          password: 'dane',
        },
    ];

    async findOne(id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }
}
