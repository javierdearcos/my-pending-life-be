import { User } from "./entities/user.entity";


export interface UsersRepository {
    createUser(user: User): Promise<User>
    findUser(username: string): Promise<User>
}

export const UsersRepository = Symbol('UsersRepository');