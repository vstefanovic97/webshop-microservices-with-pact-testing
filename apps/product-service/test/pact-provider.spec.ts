import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PactProviderModule, PactVerifierService } from 'nestjs-pact';
import { ProductModule } from '../src/product.module';

describe('Pact Verification', () => {
  let verifierService: PactVerifierService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ProductModule,
        PactProviderModule.register({
          providerHost: 'http://localhost:3000',
          provider: 'product-service',
          pactBrokerUrl: 'http://localhost:3002',
          pactBrokerUsername: 'vukstefanovic97',
          providerVersionTags: ['main'],
          providerVersion: '1.0.0',
          pactBrokerPassword: 'test1234',
          publishVerificationResult: true,
          consumerVersionTags: ['main'],
        }),
      ],
    }).compile();

    verifierService = moduleRef.get(PactVerifierService);

    app = moduleRef.createNestApplication();

    await app.init();
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
