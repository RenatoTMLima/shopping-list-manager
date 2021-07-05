import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ShoppingList } from '../../shoppingList/entities/shoppingList.entity';

@Entity('shoppingListProducts')
export class ShoppingListProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  shoppingListId: number;

  @Column({ type: 'integer', nullable: false })
  productId: number;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @ManyToOne((type) => ShoppingList, (shoppingList) => shoppingList.products)
  @JoinColumn({ name: 'shoppingListId' })
  shoppingList: ShoppingList;

  name: string;

  price: number;

  categoriesId: number;

  categoryName: string;
}
