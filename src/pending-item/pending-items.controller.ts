import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { PendingItemsService } from './pending-items.service';
import {
  CreatePendingItemDto,
  PendingItemDto,
  UpdatePendingItemDto,
} from './dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('pending-items')
export class PendingItemsController {

  constructor(private readonly pendingItemService: PendingItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: User, @Body() createPendingItemDto: CreatePendingItemDto): Promise<PendingItemDto> {
    return this.pendingItemService.create(user, createPendingItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: User): Promise<PendingItemDto[]> {
    return this.pendingItemService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@CurrentUser() user: User, @Param('id') id: string): Promise<PendingItemDto> {
    return this.pendingItemService.findOne(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @CurrentUser() user: User, 
    @Param('id') id: string,
    @Body() updatePendingItemDto: UpdatePendingItemDto,
  ): Promise<PendingItemDto> {
    return this.pendingItemService.update(
      user,
      id,
      updatePendingItemDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@CurrentUser() user, @Param('id') id: string): void {
    this.pendingItemService.remove(user, id);
  }
}
