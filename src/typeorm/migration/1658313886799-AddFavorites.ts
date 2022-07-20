import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavorites1658313886799 implements MigrationInterface {
    name = 'AddFavorites1658313886799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("userId" integer NOT NULL, CONSTRAINT "PK_e747534006c6e3c2f09939da60f" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists_artist" ("favoritesUserId" integer NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_4c6c39b4ed2ec136e52b84e1a3f" PRIMARY KEY ("favoritesUserId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_95f4000481a979a54ba567ce39" ON "favorites_artists_artist" ("favoritesUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a44f2a39bd14c72dfd8ad7933" ON "favorites_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favorites_albums_album" ("favoritesUserId" integer NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_fe6912b554db33d2ede76cb0d2e" PRIMARY KEY ("favoritesUserId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_74661bbbc992e24cfe2e37d47f" ON "favorites_albums_album" ("favoritesUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ff0c3cde93d2bc8c23c2b72c3" ON "favorites_albums_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favorites_tracks_track" ("favoritesUserId" integer NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_73259d7fa43bf08b297fe83dc26" PRIMARY KEY ("favoritesUserId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9a5ea9fa77fea918cdad3a0fda" ON "favorites_tracks_track" ("favoritesUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fee451584feed445b14adb7fb8" ON "favorites_tracks_track" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_95f4000481a979a54ba567ce391" FOREIGN KEY ("favoritesUserId") REFERENCES "favorites"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_74661bbbc992e24cfe2e37d47fc" FOREIGN KEY ("favoritesUserId") REFERENCES "favorites"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_9a5ea9fa77fea918cdad3a0fda8" FOREIGN KEY ("favoritesUserId") REFERENCES "favorites"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_fee451584feed445b14adb7fb80" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_fee451584feed445b14adb7fb80"`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_9a5ea9fa77fea918cdad3a0fda8"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_74661bbbc992e24cfe2e37d47fc"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_95f4000481a979a54ba567ce391"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fee451584feed445b14adb7fb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a5ea9fa77fea918cdad3a0fda"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ff0c3cde93d2bc8c23c2b72c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74661bbbc992e24cfe2e37d47f"`);
        await queryRunner.query(`DROP TABLE "favorites_albums_album"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a44f2a39bd14c72dfd8ad7933"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_95f4000481a979a54ba567ce39"`);
        await queryRunner.query(`DROP TABLE "favorites_artists_artist"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
