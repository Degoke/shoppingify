import {
  Controller,
  Post,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { ListitemService } from './listitem.service';
import { ListitemUpdateMethods } from './listitem.types';

@Controller('listitem')
export class ListitemController {
  constructor(private readonly listitemService: ListitemService) {}

  @Post('add/:id')
  addItemToList(@Param('id') id: string, @Request() req: any) {
    const { user } = req;
    return this.listitemService.addItemToList(id, user.id);
  }

  @Patch('complete/id')
  markItemAsCompleted(@Param('id') id: string) {
    return this.listitemService.completeItem(id);
  }

  @Patch('uncomplete/id')
  unMarkItemAsCompleted(@Param('id') id: string) {
    return this.listitemService.unCompleteItem(id);
  }

  @Delete('remove/:id')
  removeItem(@Param('id') id: string) {
    return this.listitemService.deleteItem(id);
  }

  @Patch('update/id')
  updateItem(@Param('id') id: string, @Query() method: ListitemUpdateMethods) {
    return this.listitemService.updateItem(id, method);
  }
}
