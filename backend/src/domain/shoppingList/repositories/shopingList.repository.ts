import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { ShoppingList } from '../entities/shoppingList.entity';
import { CreateShoppingListDTO } from '../dtos/createShoppingList.dto';

@EntityRepository(ShoppingList)
export class ShoppingListRepository extends Repository<ShoppingList> {
  async getAllShoppingLists(): Promise<ShoppingList[]> {
    try {
      return this.find();
    } catch (error) {
      throw new HttpException(
        'Error trying to retrieve the shopping cart data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneShoppingList(id: number): Promise<ShoppingList> {
    try {
      return this.findOne(id, { relations: ['products'] });
    } catch (error) {
      throw new HttpException(
        'Error trying to retrieve the shopping cart data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createOrUpdateShoppingList(
    shoppingListData: CreateShoppingListDTO,
  ): Promise<ShoppingList> {
    const createdShoppingList = this.create(shoppingListData);

    return this.save(createdShoppingList);
  }

  async deleteShoppingList(id: number): Promise<void> {
    await this.delete(id);

    return;
  }
}
