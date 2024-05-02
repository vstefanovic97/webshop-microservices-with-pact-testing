import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { SeedService } from './db/seed.service';
import { ProductEntity } from './db/entities/product.entity';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './db/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats-srv:4222'],
        },
      },
    ]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, SeedService],
})
export class ProductModule {}
