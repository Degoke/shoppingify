import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { CategoryService } from 'src/category/category.service';
import checkIfValidUUID from 'src/utils/check_uuid';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './repositories/item.repository,';

@Injectable()
export class ItemService {
  constructor(
    private itemRepository: ItemRepository,
    private accountService: AccountService,
    private categoryService: CategoryService,
  ) {}

  async createItem(createItemDto: CreateItemDto, userId: string) {
    try {
      const dtoCategory = createItemDto.category;

      let category;

      const account = await this.accountService.findOne(userId);
      if (!account) {
        throw new BadRequestException('Account not found');
      }

      if (checkIfValidUUID(dtoCategory)) {
        category = await this.categoryService.findOne(createItemDto.category);
      }

      if (!category) {
        category = await this.categoryService.create(
          {
            name: createItemDto.category,
          },
          userId,
        );
      }

      const newItem = await this.itemRepository.create({
        ...createItemDto,
        category,
        account,
      });

      await this.itemRepository.save(newItem);

      return newItem;
    } catch (error) {
      throw error;
    }
  }

  // async findItems() {}

  async findItem(id: string) {
    try {
      const item = await this.itemRepository.findOneBy({ id });
      if (!item) {
        throw new BadRequestException('Item not found');
      }

      return item;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id: string) {
    try {
      return await this.itemRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
