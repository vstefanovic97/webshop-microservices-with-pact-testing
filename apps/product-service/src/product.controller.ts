import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ProductEntity } from './db/entities/product.entity';

@Controller('/api/browse')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  getProducts(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<ProductEntity[]> {
    return this.productService.findAll(paginationQuery);
  }

  @Get('/products/:id')
  getProduct(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return this.productService.find(id);
  }
}
