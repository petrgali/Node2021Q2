import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../modules/users/users.entity';

export class InitAdmin1625487101931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const root = new User();
    root.login = 'admin';
    root.hashPassword('admin');
    await queryRunner.query(
      `INSERT INTO public.user("id", "name", "login", "password") 
            VALUES('${root.id}', '${root.name}', '${root.login}', '${root.password}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.user WHERE login = 'admin'`);
  }
}
