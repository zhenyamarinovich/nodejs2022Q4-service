import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1676918406577 implements MigrationInterface {
    name = 'NewMigration1676918406577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" character varying, "albumId" character varying, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "FavotitesArtist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid, CONSTRAINT "REL_f1739c957a131ad48cdfbdb64d" UNIQUE ("artistId"), CONSTRAINT "PK_c7449cde41752d8b33e4150759b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "FavotitesAlbum" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid, CONSTRAINT "REL_44a2dae39474a167478d356754" UNIQUE ("albumId"), CONSTRAINT "PK_18ccd7cc7596724d8fd7f6816a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "FavotitesTrack" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid, CONSTRAINT "REL_d05876d602c60a0c1cd7b2fb50" UNIQUE ("trackId"), CONSTRAINT "PK_7749f485925e29501b37d9ac7c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "FavotitesArtist" ADD CONSTRAINT "FK_f1739c957a131ad48cdfbdb64dc" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "FavotitesAlbum" ADD CONSTRAINT "FK_44a2dae39474a167478d356754a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "FavotitesTrack" ADD CONSTRAINT "FK_d05876d602c60a0c1cd7b2fb509" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FavotitesTrack" DROP CONSTRAINT "FK_d05876d602c60a0c1cd7b2fb509"`);
        await queryRunner.query(`ALTER TABLE "FavotitesAlbum" DROP CONSTRAINT "FK_44a2dae39474a167478d356754a"`);
        await queryRunner.query(`ALTER TABLE "FavotitesArtist" DROP CONSTRAINT "FK_f1739c957a131ad48cdfbdb64dc"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "FavotitesTrack"`);
        await queryRunner.query(`DROP TABLE "FavotitesAlbum"`);
        await queryRunner.query(`DROP TABLE "FavotitesArtist"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
