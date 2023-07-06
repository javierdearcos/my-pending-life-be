import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PendingItemsService } from './pending-items.service';
import { CreatePendingItemDto } from './dto/create-pending-item.dto';
import { UpdatePendingItemDto } from './dto/update-pending-item.dto';
import { PendingItem } from './dto/pending-item.dto';

@Controller('pending-items')
export class PendingItemsController {
  constructor(private readonly pendingItemService: PendingItemsService) {}

  @Post()
  create(@Body() createPendingItemDto: CreatePendingItemDto): PendingItem {
    return this.pendingItemService.create(createPendingItemDto);
  }

  @Get()
  findAll(): PendingItem[] {
    return this.pendingItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): PendingItem {
    return this.pendingItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePendingItemDto: UpdatePendingItemDto): PendingItem {
    return this.pendingItemService.update(id, updatePendingItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.pendingItemService.remove(id);
  }
}
