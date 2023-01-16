import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  create(@Body() createItemDto: CreateItemDto, @Request() req: any) {
    const { user } = req;
    return this.itemService.createItem(createItemDto, user.id);
  }

  @Get(':id')
  getItem(@Param('id') id: string) {
    return this.itemService.findItem(id);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(id);
  }
}
