import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../resources/users/users.entity'

export class InitDeploy1625478090021 implements MigrationInterface {
  name = 'InitDeploy1625478090021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const root = getRepository(User).create({
      login: 'admin',
    })
    root.hashPassword('admin')
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board_column" ("id" character varying NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "boardId" character varying, CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("id" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" character varying NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userIdId" character varying, "boardIdId" character varying, "columnIdId" character varying, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_column" ADD CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_29c593b244774c65824ae1df648" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_61a750180758aaf4a589ccefaa9" FOREIGN KEY ("boardIdId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_4f196ca1ee5d10a97018d33a114" FOREIGN KEY ("columnIdId") REFERENCES "board_column"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO public.user("id", "name", "login", "password") 
      VALUES ('${root.id}', '${root.name}', '${root.login}', '${root.password}')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_4f196ca1ee5d10a97018d33a114"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_61a750180758aaf4a589ccefaa9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_29c593b244774c65824ae1df648"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_column" DROP CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "board_column"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
