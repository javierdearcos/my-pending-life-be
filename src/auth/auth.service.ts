import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    private SALT_ROUNDS = 10;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async signUp(user: CreateUserDTO): Promise<UserDto> {
        const createdUser = await this.usersService.createUser({
            email: user.email,
            username: user.username,
            password: bcrypt.hashSync(user.password, this.SALT_ROUNDS)
        });

        return {
            email: createdUser.email,
            username: createdUser.username,
            pendingItems: 0,
            pendingHours: 0.0,
            pendingCost: 0.0
        }
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findUser(username);

        console.log(JSON.stringify(user));

        console.log('hash password: ' + bcrypt.hashSync(password, this.SALT_ROUNDS));

        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }
}
