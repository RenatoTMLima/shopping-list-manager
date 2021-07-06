import { ShoppingListProduct } from './shoppingListProduct.interface'

export interface ShoppingList {
  id: number;
  name: string;
  description: string;
  totalPrice?: number;
  products?: ShoppingListProduct[]
}
