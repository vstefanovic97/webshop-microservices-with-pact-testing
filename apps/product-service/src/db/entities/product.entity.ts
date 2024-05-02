import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  imageUrls: string[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('boolean')
  inventory: boolean;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  categories: CategoryEntity[];
}
