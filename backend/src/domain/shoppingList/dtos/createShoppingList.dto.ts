import { CreateShoppingListProductDTO } from './createShoppingListProduct.dto';

export interface CreateShoppingListDTO {
  id?: number;
  name: string;
  description?: string;
  totalPrice?: number;
  products?: CreateShoppingListProductDTO[];
}
