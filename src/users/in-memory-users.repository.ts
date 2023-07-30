import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";


@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
    private readonly users: User[] = [
        {
          id: '69b23172-b1ed-40c3-a5f9-78ee15743ccc',
          username: 'john',
          password: 'doe',
        },
        {
          id: 'bbd020d9-b989-4e4c-9b00-7a4cee752ddd',
          username: 'jane',
          password: 'dane',
        },
    ];

    async createUser(user: User): Promise<User> {
        user.id = uuidv4();

        this.users.push(user);

        return user;
    }

    async findUser(username: string): Promise<User> {
        return this.users.find(user => user.username === username);
    }

}