import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListRepository } from './repositories/list.repository';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [ListController],
  providers: [ListService, ListRepository],
  exports: [ListService],
})
export class ListModule {}
