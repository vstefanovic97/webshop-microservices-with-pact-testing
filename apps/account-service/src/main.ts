import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats-srv:4222'],
      waitOnFirstConnect: true,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
