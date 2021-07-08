import { BadRequestException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { ShoppingList } from '../entities/shoppingList.entity';
import { CreateShoppingListDTO } from '../dtos/createShoppingList.dto';

@EntityRepository(ShoppingList)
export class ShoppingListRepository extends Repository<ShoppingList> {
  async getAllShoppingLists(): Promise<ShoppingList[]> {
    try {
      return this.find();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar listas de compras');
    }
  }

  async getOneShoppingList(id: number): Promise<ShoppingList> {
    try {
      return this.findOne(id, { relations: ['products'] });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar a lista de compras');
    }
  }

  async createOrUpdateShoppingList(
    shoppingListData: CreateShoppingListDTO,
  ): Promise<ShoppingList> {
    try {
      const createdShoppingList = this.create(shoppingListData);

      return this.save(createdShoppingList);
    } catch (error) {
      throw new BadRequestException('Erro ao criar/atualizar lista de compras');
    }
  }

  async deleteShoppingList(id: number): Promise<void> {
    try {
      await this.delete(id);

      return;
    } catch (error) {
      throw new BadRequestException('Erro ao remover lista de compras');
    }
  }
}
