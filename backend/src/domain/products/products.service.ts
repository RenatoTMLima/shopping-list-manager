import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getAllProducts(): Promise<Product[]> {
    const response = await this.productsRepository.getAllProducts();

    const products: Product[] = response.map((product) => ({
      id: product.id,
      categoriesId: product.categoriesId,
      categoryName: product.categories.name,
      name: product.name,
      price: product.price,
    }));

    return products;
  }
}
