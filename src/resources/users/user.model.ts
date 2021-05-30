const uuid = require('uuid').v4;

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
export interface IUserRaw {
  name?: string;
  login?: string;
  password?: string;
}
class User {
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
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
module.exports = User;