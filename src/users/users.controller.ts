import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@CurrentUser() user) {
        return user;
    }
}
