import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

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

    async signUp(user: User): Promise<User> {
        return this.usersService.createUser(user);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findUser(username);

        if (user && user.password === password) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }
}
