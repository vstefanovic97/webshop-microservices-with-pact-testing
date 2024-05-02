import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CategoryEntity } from '../db/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  getHeader(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      where: { parentCategory: IsNull() },
      relations: {
        subCategories: true,
      },
    });
  }
}
