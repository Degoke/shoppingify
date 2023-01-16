import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { UpdateListDto } from './dto/update-list.dto';
import { ListRepository } from './repositories/list.repository';
import { Status } from './list.type';

@Injectable()
export class ListService {
  constructor(
    private listRepository: ListRepository,
    private accountService: AccountService,
  ) {}

  async findCurrentList(userId: string) {
    try {
      let currentList = await this.listRepository.findOne({
        where: {
          is_current_list: true,
          account: {
            id: userId,
          },
        },
        relations: ['items'],
      });

      if (!currentList) {
        const account = await this.accountService.findOne(userId);
        if (!account) {
          throw new BadRequestException('Error creating list');
        }
        currentList = await this.listRepository.create({ account: account });
        await this.listRepository.save(currentList);
      }

      return currentList;
    } catch (error) {
      throw error;
    }
  }

  async completeList(userId: string) {
    try {
      const list = await this.listRepository.findOne({
        where: {
          is_current_list: true,
          account: {
            id: userId,
          },
        },
      });

      if (!list) {
        throw new BadRequestException('List not found');
      }

      list.status = Status.COMPLETED;
      list.completed_at = new Date();
      list.is_current_list = false;

      await this.listRepository.save(list);

      return list;
    } catch (error) {
      throw error;
    }
  }

  async cancelList(userId: string) {
    try {
      const list = await this.listRepository.findOne({
        where: {
          is_current_list: true,
          account: {
            id: userId,
          },
        },
      });

      if (!list) {
        throw new BadRequestException('List not found');
      }

      list.status = Status.CANCELLED;
      list.completed_at = new Date();
      list.is_current_list = false;

      await this.listRepository.save(list);

      return list;
    } catch (error) {
      throw error;
    }
  }

  async updateList(userId: string, updateListDto: UpdateListDto) {
    try {
      const list = await this.listRepository.findOne({
        where: {
          is_current_list: true,
          account: {
            id: userId,
          },
        },
      });

      if (!list) {
        throw new BadRequestException('List not found');
      }

      list.is_editing = false;
      list.name = updateListDto.name;

      await this.listRepository.save(list);

      return list;
    } catch (error) {
      throw error;
    }
  }
}
