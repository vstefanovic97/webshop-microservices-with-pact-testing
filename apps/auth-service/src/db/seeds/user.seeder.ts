import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { hash } from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      await dataSource.query('TRUNCATE "user_entity" RESTART IDENTITY;');

      const userFactory = factoryManager.get(UserEntity);
      await userFactory.saveMany(5);
      const repository = dataSource.getRepository(UserEntity);

      await repository.insert({
        email: 'stefanovicvuk97@gmail.com',
        password: await hash('test1234', 10),
      });
    }
  }
}
