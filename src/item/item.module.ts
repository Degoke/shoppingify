import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ItemRepository } from './repositories/item.repository,';
import { CategoryModule } from 'src/category/category.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [AccountModule, CategoryModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
