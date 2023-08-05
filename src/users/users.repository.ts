import { CreateUser } from "./entities/create-user.entity";
import { User } from "./entities/user.entity";


export interface UsersRepository {
    createUser(user: CreateUser): Promise<User>
    findUser(username: string): Promise<User>
}

export const UsersRepository = Symbol('UsersRepository');