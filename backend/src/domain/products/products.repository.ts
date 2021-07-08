import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
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
      throw new BadRequestException('Erro ao buscar produtos');
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
      throw new BadRequestException('Erro ao buscar produtos');
    }
  }
}
