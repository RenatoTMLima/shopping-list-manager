import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';

import { ShoppingListController } from './shoppingList.controller';
import { ShoppingListService } from './shoppingList.service';
import { ShoppingListRepository } from './repositories/shopingList.repository';
import { ShoppingListProductsRepository } from './repositories/shoppingListProducts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingListRepository,
      ShoppingListProductsRepository,
    ]),
    ProductsModule,
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
