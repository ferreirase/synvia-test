import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTask1701038405602 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'tags',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'responsibleId',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'varchar',
            default: 'current_timestamp',
          },
          {
            name: 'updated_at',
            type: 'varchar',
            default: 'current_timestamp',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['responsibleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const taskTable = await queryRunner.getTable('tasks');
    const foreignKey = taskTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('responsibleId') !== -1,
    );
    await queryRunner.dropForeignKey('tasks', foreignKey);

    await queryRunner.dropTable('tasks');
  }
}
