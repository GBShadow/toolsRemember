import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddTagIdToTools1607355431269
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tools',
      new TableColumn({
        name: 'tags_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'tools',
      new TableForeignKey({
        columnNames: ['tags_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        name: 'ToolTag',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tools', 'ToolTag');
    await queryRunner.dropColumn('tools', 'tags_id');
  }
}
