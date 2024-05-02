import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductServiceController', () => {
  let productServiceController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productServiceController = app.get<ProductController>(ProductService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productServiceController.getProducts()).toBe('Hello World!');
    });
  });
});
