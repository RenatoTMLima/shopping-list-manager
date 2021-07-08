import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListService } from './shoppingList.service';
import { ShoppingList } from './entities/shoppingList.entity';
import { ShoppingListProducts } from './entities/shoppingListProducts.entity';
import { ProductsRepository } from '../products/products.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ShoppingListService Tests', () => {
  let shoppingListService: ShoppingListService;

  const shoppingListRepositoryMock = {
    getAllShoppingLists: jest.fn().mockImplementation(() => [
      {
        id: 1,
        name: 'Compra de casa',
        description: 'Itens para ter na casa',
        totalPrice: 3798.1,
      },
      {
        id: 2,
        name: 'Compras do escritório',
        description: 'Produtos essenciais para o escritório',
        totalPrice: null,
      },
    ]),
    getOneShoppingList: jest.fn().mockImplementation((id) => {
      if (id !== 1)
        throw new BadRequestException('Erro ao buscar a lista de compras');

      return {
        id: 1,
        name: 'Compra de casa',
        description: 'Itens para ter na casa',
        totalPrice: 3798.1,
        products: [
          {
            id: 15,
            shoppingListId: 1,
            productId: 1,
            quantity: 942,
          },
          {
            id: 17,
            shoppingListId: 1,
            productId: 4,
            quantity: 4,
          },
        ],
      };
    }),
    createOrUpdateShoppingList: jest.fn().mockImplementation((shoppingList) => {
      if (!shoppingList.id) return { ...shoppingList, id: 1 };

      if (shoppingList.id === 1) return shoppingList;
      else
        throw new BadRequestException(
          'Erro ao criar/atualizar lista de compras',
        );
    }),
    deleteShoppingList: jest.fn().mockImplementation((id) => {
      if (id !== 1)
        throw new BadRequestException('Erro ao remover lista de compras');

      return;
    }),
  };

  const shoppingListProductsRepositoryMock = {
    getAllProductsFromShoppingList: jest.fn().mockImplementation((_) => [
      {
        id: 15,
        shoppingListId: 1,
        productId: 1,
        quantity: 942,
      },
      {
        id: 17,
        shoppingListId: 1,
        productId: 4,
        quantity: 4,
      },
    ]),
    deleteProducts: jest.fn(),
    createOrUpdateProducts: jest.fn(),
  };

  const productsRepositoryMock = {
    getProductsByIds: jest.fn().mockImplementation((_) => [
      {
        id: 1,
        name: 'Tomate 1kg',
        categoriesId: 1,
        price: 3.99,
        categories: { id: 1, name: 'Hortifruti' },
      },
      {
        id: 4,
        name: 'Abobrinha 1kg',
        categoriesId: 1,
        price: 4.29,
        categories: { id: 1, name: 'Hortifruti' },
      },
    ]),
  };

  beforeEach(async () => {
    const shoppingListModule: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingListService,
        {
          provide: getRepositoryToken(ShoppingList),
          useValue: shoppingListRepositoryMock,
        },
        {
          provide: getRepositoryToken(ShoppingListProducts),
          useValue: shoppingListProductsRepositoryMock,
        },
        {
          provide: ProductsRepository,
          useValue: productsRepositoryMock,
        },
      ],
    }).compile();

    shoppingListService =
      shoppingListModule.get<ShoppingListService>(ShoppingListService);
  });

  it('should return all shopping lists created', async () => {
    const lists = await shoppingListService.getAllShoppingLists();

    expect(lists.length).toEqual(2);
    expect(lists[0].id).toEqual(1);
    expect(lists[1].name).toEqual('Compras do escritório');
  });

  it('should return a shooping list sending an id', async () => {
    const list = await shoppingListService.getOneShoppingList(1);

    expect(list.id).toEqual(1);
    expect(list.name).toEqual('Compra de casa');
    expect(list.totalPrice).toEqual(3798.1);
    expect(list.products.length).toEqual(2);
    expect(list.products[0].productId).toEqual(1);
    expect(list.products[0].quantity).toEqual(942);
    expect(list.products[0].categoriesId).toEqual(1);
    expect(list.products[0].categoryName).toEqual('Hortifruti');
  });

  it('should throw an error trying to retrieve a non existing shopping list', async () => {
    shoppingListService.getOneShoppingList(2).catch((error) => {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Erro ao buscar a lista de compras');
    });
  });

  it('should return a new shopping list', async () => {
    const createdShoppingList =
      await shoppingListService.createOrUpdateShoppingList({
        name: 'Lista Teste',
        description: 'Lista para ser usada no teste',
      });

    expect(createdShoppingList.id).toEqual(1);
    expect(createdShoppingList.name).toEqual('Lista Teste');
  });

  it('should return the updated shopping list', async () => {
    const createdShoppingList =
      await shoppingListService.createOrUpdateShoppingList({
        id: 1,
        name: 'Lista Teste 2',
        description: 'Lista para ser usada no teste',
        products: [
          {
            id: 15,
            shoppingListId: 1,
            productId: 1,
            quantity: 999,
          },
          {
            id: 20,
            shoppingListId: 1,
            productId: 2,
            quantity: 12,
          },
        ],
      });

    expect(createdShoppingList.id).toEqual(1);
    expect(createdShoppingList.name).toEqual('Lista Teste 2');
  });

  it('should throw an error trying to update a non existing shopping list', async () => {
    shoppingListService
      .createOrUpdateShoppingList({
        id: 2,
        name: 'Lista Teste 2',
        description: 'Lista para ser usada no teste',
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual(
          'Erro ao criar/atualizar lista de compras',
        );
      });
  });

  it('should delete a shooping list', async () => {
    expect(() => shoppingListService.deleteShoppingList(1)).not.toThrowError();
  });

  it('should throw an error trying to delete a shooping list', async () => {
    shoppingListService.deleteShoppingList(2).catch((error) => {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Erro ao remover lista de compras');
    });
  });
});
