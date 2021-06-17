import { v4 as uuid } from 'uuid'
import { IUser } from '../../common/types'

export interface IUserRaw {
  id?: string,
  name?: string;
  login?: string;
  password?: string;
}
export class User implements IUser {
  public id: string;
  public name: string;
  public login: string;
  public password: string;
  constructor({
    id = uuid(),
    name = 'TEST_NAME',
    login = 'TEST_LOGIN',
    password = 'TEST_PWD',
  } = {}) {
    this.id = id
    this.name = name
    this.login = login
    this.password = password
  }
  static toResponse(user: User): IUserRaw {
    const { id, name, login } = user
    return { id, name, login }
  }
}