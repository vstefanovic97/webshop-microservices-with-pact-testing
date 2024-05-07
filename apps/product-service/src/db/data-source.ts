// src/db/data-source.ts
import { DataSourceOptions } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { SeederOptions } from 'typeorm-extension';
import ProductSeeder from './seeds/product.seeder';
import ProductFactory from './factories/product.factory';

const isTestEnvironment = process.env.NODE_ENV === 'test';

export const dataSourceOptions: DataSourceOptions & SeederOptions =
  isTestEnvironment
    ? {
        type: 'sqlite',
        database: ':memory:', // Use an in-memory database for tests
        dropSchema: true, // Drop the schema after connection (cleans up after each test run)
        logging: false, // Reduce log output during tests,
        synchronize: true,
        entities: [ProductEntity, CategoryEntity],
        seeds: [ProductSeeder],
        factories: [ProductFactory],
      }
    : {
        type: 'postgres',
        host: 'product-postgres-srv',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [ProductEntity, CategoryEntity],
        connectTimeoutMS: 10000,
        seeds: [ProductSeeder],
        factories: [ProductFactory],
        synchronize: true, // TODO turn of for production env
      };
