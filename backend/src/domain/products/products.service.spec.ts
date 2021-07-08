import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

describe('ProductsService Tests', () => {
  let productsService: ProductsService;

  const productsRepositoryMock = {
    getAllProducts: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          name: 'Tomate 1kg',
          categoriesId: 1,
          price: 3.99,
          categories: {
            id: 1,
            name: 'Hortifruti',
          },
        },
        {
          id: 2,
          name: 'Batata 1kg',
          categoriesId: 1,
          price: 2.59,
          categories: {
            id: 1,
            name: 'Hortifruti',
          },
        },
      ];
    }),
  };

  beforeEach(async () => {
    const productsModule: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: productsRepositoryMock,
        },
      ],
    }).compile();

    productsService = productsModule.get<ProductsService>(ProductsService);
  });

  it('should return products from the products API and normalize data', async () => {
    const products = await productsService.getAllProducts();

    expect(products.length).toEqual(2);
    expect(products[0].categoryName).toEqual('Hortifruti');
  });
});
