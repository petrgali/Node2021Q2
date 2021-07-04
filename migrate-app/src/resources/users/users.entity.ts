import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn()
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
