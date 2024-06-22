import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats-srv:4222'],
      waitOnFirstConnect: true,
    },
  });

  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
