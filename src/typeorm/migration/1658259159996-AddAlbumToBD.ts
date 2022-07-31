import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAlbumToBD1658259159996 implements MigrationInterface {
  name = 'AddAlbumToBD1658259159996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistIdId" uuid, CONSTRAINT "REL_741ddfe3b22f018084c7d9f957" UNIQUE ("artistIdId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_741ddfe3b22f018084c7d9f9574" FOREIGN KEY ("artistIdId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_741ddfe3b22f018084c7d9f9574"`,
    );
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
