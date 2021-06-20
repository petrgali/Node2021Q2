import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationRS1624218064981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.board
        (
            id character varying COLLATE pg_catalog."default" NOT NULL,
            title character varying COLLATE pg_catalog."default" NOT NULL,
            CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY (id)
        )`)
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.board_column
    (
        id character varying COLLATE pg_catalog."default" NOT NULL,
        title character varying COLLATE pg_catalog."default" NOT NULL,
        "order" integer NOT NULL,
        "boardId" character varying COLLATE pg_catalog."default",
        CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY (id),
        CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId")
            REFERENCES public.board (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`)
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.task
    (
        id character varying COLLATE pg_catalog."default" NOT NULL,
        title character varying COLLATE pg_catalog."default" NOT NULL,
        "order" integer NOT NULL,
        description character varying COLLATE pg_catalog."default" NOT NULL,
        "userIdId" character varying COLLATE pg_catalog."default",
        "boardIdId" character varying COLLATE pg_catalog."default",
        "columnIdId" character varying COLLATE pg_catalog."default",
        CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id),
        CONSTRAINT "FK_29c593b244774c65824ae1df648" FOREIGN KEY ("userIdId")
            REFERENCES public."user" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE SET NULL,
        CONSTRAINT "FK_4f196ca1ee5d10a97018d33a114" FOREIGN KEY ("columnIdId")
            REFERENCES public.board_column (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
        CONSTRAINT "FK_61a750180758aaf4a589ccefaa9" FOREIGN KEY ("boardIdId")
            REFERENCES public.board (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`)
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS public."user"
    (
        id character varying COLLATE pg_catalog."default" NOT NULL,
        name character varying COLLATE pg_catalog."default" NOT NULL,
        login character varying COLLATE pg_catalog."default" NOT NULL,
        password character varying COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
    )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user" CASCADE`)
        await queryRunner.query(`DROP TABLE "board" CASCADE`)
        await queryRunner.query(`DROP TABLE "board_column" CASCADE`)
        await queryRunner.query(`DROP TABLE "task" CASCADE`)
    }

}
