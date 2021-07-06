import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductsRepository } from '../products/products.repository';
import { ShoppingListRepository } from './repositories/shopingList.repository';
import { ShoppingListProductsRepository } from './repositories/shoppingListProducts.repository';
import { ShoppingList } from './entities/shoppingList.entity';
import { CreateShoppingListDTO } from './dtos/createShoppingList.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingListRepository)
    private shoppingListRepository: ShoppingListRepository,
    @InjectRepository(ShoppingListProductsRepository)
    private shoppingListProductsRepository: ShoppingListProductsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async getAllShoppingLists(): Promise<ShoppingList[]> {
    return this.shoppingListRepository.getAllShoppingLists();
  }

  async getOneShoppingList(id: number): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListRepository.getOneShoppingList(
      id,
    );

    if (shoppingList.products.length === 0) return shoppingList;

    const productsIds = shoppingList.products.map(
      (product) => product.productId,
    );

    const productsData = await this.productsRepository.getProductsByIds(
      productsIds,
    );

    shoppingList.products.forEach((product) => {
      const productData = productsData.find(
        (productDetails) => productDetails.id === product.productId,
      );

      product.name = productData.name;
      product.price = productData.price;
      product.categoriesId = productData.categoriesId;
      product.categoryName = productData.categories.name;
    });

    return shoppingList;
  }

  async createOrUpdateShoppingList(
    shoppingListData: CreateShoppingListDTO,
  ): Promise<ShoppingList> {
    const { products, ...shoppingList } = shoppingListData;

    const createdShoppingList =
      await this.shoppingListRepository.createOrUpdateShoppingList(
        shoppingList,
      );

    if (!products || products.length === 0) return createdShoppingList;

    const olderProductsList =
      await this.shoppingListProductsRepository.getAllProductsFromShoppingList(
        createdShoppingList.id,
      );

    const productsToRemove = olderProductsList.filter(
      (older) => !products.find((product) => product.id === older.id),
    );

    console.log(productsToRemove);

    await this.shoppingListProductsRepository.deleteProducts(productsToRemove);

    await this.shoppingListProductsRepository.createOrUpdateProducts(products);

    return createdShoppingList;
  }

  async deleteShoppingList(id: number): Promise<void> {
    return this.shoppingListRepository.deleteShoppingList(id);
  }
}
