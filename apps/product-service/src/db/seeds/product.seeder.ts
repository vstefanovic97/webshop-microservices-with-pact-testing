import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';

export default class ProductSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      console.log('debugger 1');
      await dataSource.query(
        'DELETE FROM "category_entity_products_product_entity"',
      );
      await dataSource.query('DELETE FROM "product_entity"');
      await dataSource.query('DELETE FROM "category_entity"');
      console.log('debugger 2');

      const categoryRepository = dataSource.getRepository(CategoryEntity);

      const productFactory = factoryManager.get(ProductEntity);

      const categoriesPromise = ['new', 'mens', 'womens', 'kids'].map(
        async (category) => {
          const subCategoriesPromise = [
            'jeans',
            'shirts',
            'shoes',
            'sneakers',
          ].map(async (subCategory) => {
            const productsForSubCategory = await productFactory.saveMany(20);

            return categoryRepository.create({
              name: subCategory,
              products: productsForSubCategory,
            });
          });

          const subCategories = await Promise.all(subCategoriesPromise);
          await categoryRepository.save(subCategories);

          const allProducsForCategory = subCategories.reduce(
            (products, subCategory) => [...products, ...subCategory.products],
            [],
          );

          return categoryRepository.create({
            name: category,
            products: allProducsForCategory,
            subCategories: subCategories,
          });
        },
      );

      console.log('debugger 3');

      const categories = await Promise.all(categoriesPromise);

      console.log('debugger 4');

      await categoryRepository.save(categories);

      console.log('debugger 5');
    }
  }
}
