import { BadRequestException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { ShoppingListProducts } from '../entities/shoppingListProducts.entity';
import { CreateShoppingListProductDTO } from '../dtos/createShoppingListProduct.dto';

@EntityRepository(ShoppingListProducts)
export class ShoppingListProductsRepository extends Repository<ShoppingListProducts> {
  async getAllProductsFromShoppingList(
    shoppingListId: number,
  ): Promise<ShoppingListProducts[]> {
    try {
      return this.find({ shoppingListId });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produtos da lista');
    }
  }

  async createOrUpdateProducts(
    productsData: CreateShoppingListProductDTO[],
  ): Promise<void> {
    try {
      const createdProducts = productsData.map((product) =>
        this.create(product),
      );

      this.save(createdProducts);

      return;
    } catch (error) {
      throw new BadRequestException('Erro ao criar/alterar produtos da lista');
    }
  }

  async deleteProducts(
    productsToRemove: ShoppingListProducts[],
  ): Promise<void> {
    try {
      await this.remove(productsToRemove);

      return;
    } catch (error) {
      throw new BadRequestException('Erro ao remover produtos da lista');
    }
  }
}
