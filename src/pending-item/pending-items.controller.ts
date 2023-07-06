import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PendingItemsService } from './pending-items.service';
import { CreatePendingItemDto, PendingItemDto, UpdatePendingItemDto } from './dto';

@Controller('pending-items')
export class PendingItemsController {
  constructor(private readonly pendingItemService: PendingItemsService) {}

  @Post()
  create(@Body() createPendingItemDto: CreatePendingItemDto): PendingItemDto {
    return this.pendingItemService.create(createPendingItemDto);
  }

  @Get()
  findAll(): PendingItemDto[] {
    return this.pendingItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): PendingItemDto {
    return this.pendingItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePendingItemDto: UpdatePendingItemDto): PendingItemDto {
    return this.pendingItemService.update(id, updatePendingItemDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.pendingItemService.remove(id);
  }
}
