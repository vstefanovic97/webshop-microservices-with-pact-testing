import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('/api/browse/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/header')
  getHeader() {
    return this.categoryService.getHeader();
  }
}
