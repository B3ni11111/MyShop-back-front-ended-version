import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get('full')
  findAllWithCategories() {
    return this.itemsService.findAllWithCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new BadRequestException(`Invalid item id: ${id}`);
    }
    return this.itemsService.findOne(numericId);
  }
}
