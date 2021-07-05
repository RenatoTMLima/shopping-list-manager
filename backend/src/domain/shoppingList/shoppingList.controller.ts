import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateShoppingListDTO } from './dtos/createShoppingList.dto';
import { ShoppingList } from './entities/shoppingList.entity';
import { ShoppingListService } from './shoppingList.service';

@Controller('shoppingList')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Get('/')
  async getAllShoppingLists(): Promise<ShoppingList[]> {
    return this.shoppingListService.getAllShoppingLists();
  }

  @Get('/:id')
  async getOneShoppingLists(@Param('id') id: string): Promise<ShoppingList> {
    return this.shoppingListService.getOneShoppingList(Number(id));
  }

  @Post('/')
  async createOrUpdateShoppingList(
    @Body() shoppingListData: CreateShoppingListDTO,
  ): Promise<ShoppingList> {
    return this.shoppingListService.createOrUpdateShoppingList(
      shoppingListData,
    );
  }

  @Delete('/:id')
  async deleteShoppingList(@Param('id') id: string): Promise<void> {
    return this.shoppingListService.deleteShoppingList(Number(id));
  }
}
