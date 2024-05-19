import { setSeederFactory } from 'typeorm-extension';
import { ProductEntity } from '../entities/product.entity';
import { PRODUCT_IMAGES } from './image-fixtures';
export default setSeederFactory(ProductEntity, async (faker) => {
  const product = new ProductEntity();

  product.description = faker.commerce.productDescription();
  product.price = Number(faker.commerce.price());
  product.name = faker.commerce.productName();
  product.color = faker.color.human();

  // 5% of products will be out of stock
  product.inventory = Math.random() < 0.95;

  const images = [];

  for (let i = 0; i < 6; i++) {
    images.push(PRODUCT_IMAGES[faker.number.int({ min: 1, max: 46 })]);
  }

  product.imageUrls = images;

  return product;
});
