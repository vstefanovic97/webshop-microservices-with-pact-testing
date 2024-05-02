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

  findAll({ offset, limit }: PaginationQueryDto): Promise<ProductEntity[]> {
    return this.productRepository.find({
      skip: offset,
      take: limit,
    });
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
