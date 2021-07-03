import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
const bcrypt = require('bcryptjs')

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

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10)
  }

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user
    return { id, name, login }
  }
}