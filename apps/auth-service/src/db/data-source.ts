// src/db/data-source.ts
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from './seeds/user.seeder';
import UserFactory from './factories/user.factory';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'auth-postgres-srv',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity],
  connectTimeoutMS: 10000,
  seeds: [UserSeeder],
  factories: [UserFactory],
  synchronize: true, // TODO turn of for production env
};
