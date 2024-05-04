import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './db/entities/product.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  findAll({
    page = 1,
    limit = 10,
    minPrice = 0,
    maxPrice = 10000000000,
    color,
    categoryId,
  }: PaginationQueryDto): Promise<ProductEntity[]> {
    let query = this.productRepository
      .createQueryBuilder('product')
      .where('product.price >= :minPrice', { minPrice })
      .andWhere('product.price <= :maxPrice', { maxPrice });

    if (color) {
      query = query.andWhere('product.color = :color', { color });
    }

    query = query
      .innerJoin('product.categories', 'category')
      .andWhere('category.id = :categoryId', { categoryId });

    query = query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  async find(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('No Product found for the given id');
    }

    return product;
  }
}
