import { Repository } from "typeorm";
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DbUsersRepository implements UsersRepository {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>
    ) {}
    
    async createUser(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async findUser(username: string): Promise<User> {
        return this.repository.findOneBy({
            username
        });
    }

}