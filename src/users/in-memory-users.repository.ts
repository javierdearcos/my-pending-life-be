import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { CreateUser } from "./entities/create-user.entity";


@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
    private readonly users: User[] = [
        {
          id: '69b23172-b1ed-40c3-a5f9-78ee15743ccc',
          email: 'john@doe.com',
          username: 'johndoe',
          password: 'secretpassword',
          pendingItems: []
        },
        {
          id: 'bbd020d9-b989-4e4c-9b00-7a4cee752ddd',
          email: 'jane@dane.com',
          username: 'janedane',
          password: 'evenmoresecretpassword',
          pendingItems: []
        },
    ];

    async createUser(user: CreateUser): Promise<User> {
        const createdUser = {
          id: uuidv4(),
          email: user.email,
          username: user.username,
          password: user.password,
          pendingItems: []
        };

        this.users.push(createdUser);

        return createdUser;
    }

    async findUser(username: string): Promise<User> {
        return this.users.find(user => user.username === username);
    }

}