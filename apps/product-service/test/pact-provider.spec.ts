import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../src/db/entities/product.entity';
import { PactProviderModule, PactVerifierService } from 'nestjs-pact';
import { ProductModule } from '../src/product.module';
import { TestingModule } from '@nestjs/testing';
import { runSeeder } from 'typeorm-extension';
import ProductSeeder from '../src/db/seeds/product.seeder';
import { DataSource } from 'typeorm';
import ProductFactory from '../src/db/factories/product.factory';

describe('Pact Verification', () => {
  let verifierService: PactVerifierService;
  let app: INestApplication;
  let productRepository: Repository<ProductEntity>;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ProductModule,
        PactProviderModule.register({
          providerHost: 'http://localhost:3000',
          provider: 'product-service',
          pactBrokerUrl: 'http://localhost:31000',
          pactBrokerUsername: 'vukstefanovic97',
          providerVersionTags: ['main'],
          providerVersion: '1.0.0',
          pactBrokerPassword: 'test1234',
          publishVerificationResult: true,
          consumerVersionTags: ['main'],
          stateHandlers: {
            'I have a list of categories': async () => {
              const dataSource = moduleRef.get(DataSource);
              await dataSource.destroy();
              await dataSource.initialize();

              await runSeeder(dataSource, ProductSeeder, {
                factories: [ProductFactory],
              });
            },
            'a product with id 1 does not exist': async () => {
              const dataSource = moduleRef.get(DataSource);
              await dataSource.destroy();
              await dataSource.initialize();
            },
            'a product with id 1 exists': async () => {
              const dataSource = moduleRef.get(DataSource);
              await dataSource.destroy();
              await dataSource.initialize();

              await productRepository.save({
                name: 'hat',
                id: 1,
                color: 'red',
                description: 'dummy hat',
                imageUrls: [
                  'https://s7d2.scene7.com/is/image/aeo/1305_9826_001_of?$pdp-md-opt$',
                ],
                price: 399,
                inventory: false,
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
    productRepository = moduleRef.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
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
