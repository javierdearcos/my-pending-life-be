import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { response } from 'express';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@CurrentUser() user): Promise<UserDto> {
        const me = await this.usersService.findUser(user.username);

        if (!me) {
            throw new NotFoundException();
        }

        return {
            username: me.username,
            email: me.email,
            pendingItems: me.pendingItems && me.pendingItems.length || 0,
            pendingHours: me.pendingItems && me.pendingItems.map(pendingItem => pendingItem.numberOfHours).reduce((sum, current) => sum + current, 0.0) || 0,
            pendingCost: me.pendingItems && me.pendingItems.map(pendingItem => pendingItem.cost).reduce((sum, current) =>  sum + current, 0.0) || 0
        }
    }
}
