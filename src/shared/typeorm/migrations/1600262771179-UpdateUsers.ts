import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateUsers1600262771179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'IsActive',
        type: 'bool',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'IsActive');
  }
}
