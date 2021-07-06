import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ShoppingListProducts } from './shoppingListProducts.entity';

@Entity('shoppingList')
export class ShoppingList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('real')
  totalPrice: number;

  @OneToMany(
    (type) => ShoppingListProducts,
    (shoppingListProducts) => shoppingListProducts.shoppingList,
  )
  products: ShoppingListProducts[];
}
