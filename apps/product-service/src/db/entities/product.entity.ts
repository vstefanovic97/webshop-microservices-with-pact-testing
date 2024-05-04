import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Index,
  JoinTable,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index()
  color: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  imageUrls: string[];

  @Column('decimal', { precision: 10, scale: 2 })
  @Index()
  price: number;

  @Column('boolean')
  inventory: boolean;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  @JoinTable()
  categories: CategoryEntity[];
}
