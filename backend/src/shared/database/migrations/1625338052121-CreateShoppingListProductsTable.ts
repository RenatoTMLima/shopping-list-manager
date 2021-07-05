import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateShoppingListProductsTable1625338052121
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shoppingListProducts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'shoppingListId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'productId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'shoppingListProducts',
      new TableForeignKey({
        name: 'ShoppingListProductFK',
        columnNames: ['shoppingListId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shoppingList',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'shoppingListProducts',
      'ShoppingListProductFK',
    );

    await queryRunner.dropTable('shoppingListProducts');
  }
}
