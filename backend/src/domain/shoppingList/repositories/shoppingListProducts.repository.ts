import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { ShoppingListProducts } from '../entities/shoppingListProducts.entity';
import { CreateShoppingListProductDTO } from '../dtos/createShoppingListProduct.dto';

@EntityRepository(ShoppingListProducts)
export class ShoppingListProductsRepository extends Repository<ShoppingListProducts> {
  async getAllProductsFromShoppingList(
    shoppingListId: number,
  ): Promise<ShoppingListProducts[]> {
    return this.find({ shoppingListId });
  }

  async createOrUpdateProducts(
    productsData: CreateShoppingListProductDTO[],
  ): Promise<void> {
    const createdProducts = productsData.map((product) => this.create(product));

    this.save(createdProducts);

    return;
  }

  async deleteProducts(
    productsToRemove: ShoppingListProducts[],
  ): Promise<void> {
    await this.remove(productsToRemove);

    return;
  }
}
