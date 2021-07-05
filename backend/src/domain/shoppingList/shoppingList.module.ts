import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';

import { ShoppingListController } from './shoppingList.controller';
import { ShoppingListService } from './shoppingList.service';
import { ShoppingListRepository } from './repositories/shopingList.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingListRepository]), ProductsModule],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
