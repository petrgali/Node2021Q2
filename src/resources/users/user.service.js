const API = require('./user.memory.repository').userAPI;
const { taskAPI } = require('../tasks/task.memory.repository');
const User = require('./user.model');

const serviceAPI = {
  getAll: () => API.getAll(),

  getById: (idx) => API.getById(idx),

  addNewRecord: (data) => {
    const user = new User({
      name: data.name,
      login: data.login,
      password: data.password,
    });
    API.addNewRecord(user);
    return user;
  },

  updateRecord: (body, params) => {
    const update = {
      name: body.name,
      login: body.login,
      password: body.password,
    };
    API.updateRecord(params.id, update);
    return serviceAPI.getById(params.id);
  },

  deleteRecord: (idx) => {
    taskAPI.unassignTask(idx);
    API.deleteRecord(idx);
  },
};

module.exports = { serviceAPI };
