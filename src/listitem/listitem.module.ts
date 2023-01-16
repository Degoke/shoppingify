import { Module } from '@nestjs/common';
import { ListitemService } from './listitem.service';
import { ListitemController } from './listitem.controller';
import { ListItemRepository } from './repositories/listitem.repository';
import { ListModule } from 'src/list/list.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [ListModule, ItemModule],
  controllers: [ListitemController],
  providers: [ListitemService, ListItemRepository],
})
export class ListitemModule {}
