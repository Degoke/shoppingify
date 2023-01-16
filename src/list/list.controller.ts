import { Controller, Get, Body, Patch, Param, Request } from '@nestjs/common';
import { ListService } from './list.service';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('current')
  getCurrentList(@Request() req: any) {
    const { user } = req;
    return this.listService.findCurrentList(user.id);
  }

  @Patch('complete/:id')
  completeList(@Param('id') id: string) {
    return this.listService.completeList(id);
  }

  @Patch('cancel/:id')
  cancelList(@Param('id') id: string) {
    return this.listService.cancelList(id);
  }

  @Patch('update/:id')
  updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.updateList(id, updateListDto);
  }
}
