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
      await dataSource.query(
        'DELETE FROM "category_entity_products_product_entity"',
      );
      await dataSource.query('DELETE FROM "product_entity"');
      await dataSource.query('DELETE FROM "category_entity"');

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
              path: `${category}/${subCategory}`,
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
            path: category,
            name: category,
            products: allProducsForCategory,
            subCategories: subCategories,
          });
        },
      );

      const categories = await Promise.all(categoriesPromise);

      await categoryRepository.save(categories);
    }
  }
}
