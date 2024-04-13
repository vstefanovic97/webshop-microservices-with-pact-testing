// src/db/factories/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../entities/user.entity';

export default setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();

  user.email = faker.internet.email();
  user.password = faker.internet.password();

  return user;
});
