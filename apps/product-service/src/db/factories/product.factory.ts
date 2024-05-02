import { setSeederFactory } from 'typeorm-extension';
import { ProductEntity } from '../entities/product.entity';

export default setSeederFactory(ProductEntity, async (faker) => {
  const product = new ProductEntity();

  product.description = faker.commerce.productDescription();
  product.price = Number(faker.commerce.price());
  product.name = faker.commerce.productName();
  product.color = faker.color.human();

  // 5% of products will be out of stock
  product.inventory = Math.random() < 0.95;

  const images = [
    faker.image.urlLoremFlickr({
      height: 640,
      width: 480,
      category: 'fashion',
    }),
    faker.image.urlLoremFlickr({
      height: 640,
      width: 480,
      category: 'fashion',
    }),
    faker.image.urlLoremFlickr({
      height: 640,
      width: 480,
      category: 'fashion',
    }),
  ];

  product.imageUrls = images;

  return product;
});
