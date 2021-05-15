const uuid = require('uuid').v4;

class User {
  constructor({
    id = uuid(),
    name = 'TEST_NAME',
    login = 'TEST_LOGIN',
    password = 'TEST_PWD'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
