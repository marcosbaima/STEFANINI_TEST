import {MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class addFieldsEmployees1642881430601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'employees',
            new TableColumn({
              name: 'taxpayerId',
              type: 'varchar',
              isNullable: false,
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
