import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private accountService: AccountService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    try {
      const account = await this.accountService.findOne(userId);

      if (!account) {
        throw new BadRequestException('Account not found');
      }
      const existingName = await this.categoryRepository.findOne({
        where: {
          name: createCategoryDto.name,
          account: {
            id: userId,
          },
        },
      });
      if (existingName) {
        throw new BadRequestException(
          `Category with name ${existingName.name} already exists`,
        );
      }
      const category = await this.categoryRepository.create({
        ...createCategoryDto,
        account,
      });
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      return await this.categoryRepository.find({
        relations: ['items'],
        where: {
          account: {
            id: userId,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.categoryRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
}
