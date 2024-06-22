// src/db/factories/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../entities/user.entity';
import { hash } from 'bcrypt';

export default setSeederFactory(UserEntity, async (faker) => {
  const user = new UserEntity();

  user.email = faker.internet.email();
  user.password = await hash(faker.internet.password(), 10);
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.phoneNumber = faker.phone.number();

  return user;
});
