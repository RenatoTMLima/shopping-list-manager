import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingListModule } from './domain/shoppingList/shoppingList.module';
import { ProductsModule } from './domain/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      synchronize: false,
      autoLoadEntities: true,
    }),
    ProductsModule,
    ShoppingListModule,
  ],
})
export class AppModule {}
