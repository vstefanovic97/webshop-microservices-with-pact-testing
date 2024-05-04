import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;

  @IsOptional()
  color?: string;

  @IsOptional()
  categoryId: number;
}
