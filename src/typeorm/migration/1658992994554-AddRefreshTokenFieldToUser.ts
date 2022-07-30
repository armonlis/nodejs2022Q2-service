import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenFieldToUser1658992994554
  implements MigrationInterface
{
  name = 'AddRefreshTokenFieldToUser1658992994554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refresh_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refresh_token"`);
  }
}
