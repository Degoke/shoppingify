import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';
import { ListService } from 'src/list/list.service';
import { ListitemUpdateMethods } from './listitem.types';
import { ListItemRepository } from './repositories/listitem.repository';

@Injectable()
export class ListitemService {
  constructor(
    private listitemRepository: ListItemRepository,
    private listService: ListService,
    private itemService: ItemService,
  ) {}

  async addItemToList(itemId: string, userId: string) {
    try {
      const currentList = await this.listService.findCurrentList(userId);
      const itemAlreadyInList = await this.listitemRepository.findOne({
        where: {
          item: {
            id: itemId,
          },
          list: {
            id: currentList.id,
          },
        },
      });

      if (itemAlreadyInList) {
        itemAlreadyInList.count += 1;
        await this.listitemRepository.save(itemAlreadyInList);
        return itemAlreadyInList;
      }

      const item = await this.itemService.findItem(itemId);
      if (!item) {
        throw new BadRequestException('Cannot fiond item');
      }
      const newItem = await this.listitemRepository.create({
        item,
        count: 1,
        list: currentList,
      });

      await this.listitemRepository.save(newItem);
      return newItem;
    } catch (error) {
      throw error;
    }
  }

  async completeItem(itemId: string) {
    try {
      const item = await this.listitemRepository.findOneBy({ id: itemId });
      if (!item) {
        throw new BadRequestException('Item not found');
      }

      item.is_completed = true;
      item.completed_at = new Date();

      await this.listitemRepository.save(item);
      return item;
    } catch (error) {
      throw error;
    }
  }

  async unCompleteItem(itemId: string) {
    try {
      const item = await this.listitemRepository.findOneBy({ id: itemId });

      if (!item) {
        throw new BadRequestException('Item not found');
      }

      item.is_completed = false;

      await this.listitemRepository.save(item);
      return item;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id: string) {
    try {
      return await this.listitemRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateItem(itemId: string, method: ListitemUpdateMethods) {
    try {
      const item = await this.listitemRepository.findOneBy({ id: itemId });

      if (!item) {
        throw new BadRequestException('Item not found');
      }

      switch (method) {
        case ListitemUpdateMethods.INCREMENT:
          item.count += 1;
          break;
        case ListitemUpdateMethods.DECREMENT:
          if (item.count === 1) {
            throw new BadRequestException('Item cannot be less than 1');
          }
          item.count -= 1;
          break;
        default:
          throw new BadRequestException('method not found');
      }

      await this.listitemRepository.save(item);
      return item;
    } catch (error) {
      throw error;
    }
  }
}
