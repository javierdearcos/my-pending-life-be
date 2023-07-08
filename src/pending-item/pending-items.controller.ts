import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PendingItemsService } from './pending-items.service';
import {
  CreatePendingItemDto,
  PendingItemDto,
  UpdatePendingItemDto,
} from './dto';

interface User {
  id: string;
}

@Controller('pending-items')
export class PendingItemsController {
  constructor(private readonly pendingItemService: PendingItemsService) {}

  private user: User = {
    id: 'f97be3f5-4af3-419b-bb56-8520f0a49ce6',
  };

  @Post()
  create(@Body() createPendingItemDto: CreatePendingItemDto): PendingItemDto {
    return this.pendingItemService.create(this.user.id, createPendingItemDto);
  }

  @Get()
  findAll(): PendingItemDto[] {
    return this.pendingItemService.findAll(this.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): PendingItemDto {
    return this.pendingItemService.findOne(this.user.id, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePendingItemDto: UpdatePendingItemDto,
  ): PendingItemDto {
    return this.pendingItemService.update(
      this.user.id,
      id,
      updatePendingItemDto
    );
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.pendingItemService.remove(this.user.id, id);
  }
}
