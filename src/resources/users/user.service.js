const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();
const getById = (idx) => usersRepo.getById(idx);
const addNewRecord = (data) => {
  const user = new User({
    name: data.name,
    login: data.login,
    password: data.password,
  });

  usersRepo.addNewRecord(user);
  return user;
};
const updateRecord = (body, params) => {
  const update = {
    name: body.name,
    login: body.login,
    password: body.password,
  };
  usersRepo.updateRecord(params.id, update);
  return getById(params.id);
};
const deleteRecord = (idx) => {
  taskRepo.unassignTask(idx);
  usersRepo.deleteRecord(idx);
};

module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
