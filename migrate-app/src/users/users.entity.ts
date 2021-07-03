import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity()
class User {

  constructor({
    id = uuid(),
    name = '',
    login = '',
    password = ''
  } = {}) {
    this.id = id
    this.name = name
    this.login = login
    this.password = password
  }

  @PrimaryColumn()
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user
    return { id, name, login }
  }
}

export default User