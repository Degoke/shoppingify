import { Controller, Get, Request } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAllCategories(@Request() req: any) {
    const { user } = req;
    return this.categoryService.findAll(user.id);
  }
}
