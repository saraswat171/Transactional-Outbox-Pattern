import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1731923627298 implements MigrationInterface {
  name = 'CreateUsers1731923627298';

  public async up(queryRunner: QueryRunner): Promise<void> {

    // Create the "users" table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '250',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      })
    );

    // Create unique index on "email" where "deleted_at" is null
    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_users_email_not_deleted"
      ON "users" ("email")
      WHERE "deleted_at" IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the unique index on "users" table
    await queryRunner.query(`
      DROP INDEX "UQ_users_email_not_deleted";
    `);

    // Drop the "users" table
    await queryRunner.dropTable('users');

  }
}
