import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class addToolIdToToolsTags1607444421277
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tools_tags',
      new TableColumn({
        name: 'tool_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tools_tags',
      new TableForeignKey({
        name: 'Tool_ToolsTags',
        columnNames: ['tool_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tools',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tools_tags', 'Tool_ToolsTags');
    await queryRunner.dropColumn('tools_tags', 'tool_id');
  }
}
