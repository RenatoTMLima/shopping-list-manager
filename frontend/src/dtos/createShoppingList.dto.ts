import { SelectedProducts } from './selectedProducts.dto'

export interface CreateShoppingListDTO {
  id?: number;
  name: string;
  description: string;
  totalPrice?: number;
  products?: SelectedProducts[];
}
