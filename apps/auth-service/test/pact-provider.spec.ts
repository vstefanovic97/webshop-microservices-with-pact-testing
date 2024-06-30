import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { UserEntity } from '../src/db/entities/user.entity';
import { PactProviderModule, PactVerifierService } from 'nestjs-pact';
import { AppModule } from '../src/app.module';

describe('Pact Verification', () => {
  let verifierService: PactVerifierService;
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        PactProviderModule.register({
          providerHost: 'http://localhost:3001',
          provider: 'auth-service',
          pactBrokerUrl: 'http://localhost:31000',
          pactBrokerUsername: 'vukstefanovic97',
          providerVersionTags: ['main'],
          providerVersion: '1.0.0',
          pactBrokerPassword: 'test1234',
          publishVerificationResult: true,
          consumerVersionTags: ['main'],
          stateHandlers: {
            'a user with foobar@gmail.com:test1234$$A exists': async () => {
              const password = await hash('test1234$$A', 10);
              await userRepository.save({
                email: 'foobar@gmail.com',
                password,
              });
            },
          },
        }),
      ],
    }).compile();

    verifierService = moduleRef.get(PactVerifierService);

    app = moduleRef.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    userRepository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('validates the expectations of Matching Service', async () => {
    const { output } = (await verifierService.verify(app)) as any;

    console.log('Pact Verification Completed!');
    console.log(output);
  }, 10000000);

  afterAll(async () => {
    await app.close();
  });
});
