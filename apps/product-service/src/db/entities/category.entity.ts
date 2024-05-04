import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @OneToMany(() => CategoryEntity, (category) => category.parentCategory)
  subCategories: CategoryEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories)
  parentCategory: CategoryEntity;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  @JoinTable()
  products: ProductEntity[];
}
