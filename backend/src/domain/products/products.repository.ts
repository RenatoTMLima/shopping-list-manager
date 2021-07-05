import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductResponseDTO } from './dtos/productResponse.dto';

@Injectable()
export class ProductsRepository {
  constructor(private httpService: HttpService) {}

  async getAllProducts(): Promise<ProductResponseDTO[]> {
    try {
      const response = await this.httpService
        .get<ProductResponseDTO[]>('/products?_expand=categories')
        .toPromise();

      return response.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      throw new HttpException(message, statusCode);
    }
  }

  async getProductsByIds(ids: number[]): Promise<ProductResponseDTO[]> {
    try {
      const routeParams = ids.reduce(
        (paramString, id) => (paramString += `&id=${id}`),
        '',
      );

      const response = await this.httpService
        .get<ProductResponseDTO[]>(`/products?_expand=categories${routeParams}`)
        .toPromise();

      return response.data;
    } catch (error) {
      const { statusCode, message } = error.response.data;
      throw new HttpException(message, statusCode);
    }
  }
}
