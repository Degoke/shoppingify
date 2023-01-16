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

  @Patch('complete')
  completeList(@Request() req: any) {
    const { user } = req;
    return this.listService.completeList(user.id);
  }

  @Patch('cancel')
  cancelList(@Request() req: any) {
    const { user } = req;
    return this.listService.cancelList(user.id);
  }

  @Patch('update')
  updateList(@Request() req: any, @Body() updateListDto: UpdateListDto) {
    const { user } = req;
    return this.listService.updateList(user.id, updateListDto);
  }
}
