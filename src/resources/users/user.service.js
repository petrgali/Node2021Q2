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
  try {
    usersRepo.addNewRecord(user);
    return User.toResponse(user);
  } catch (err) {
    return { error: err };
  }
};
const updateRecord = (idx, data) => usersRepo.updateRecord(idx, data);
const deleteRecord = (idx) => {
  taskRepo.unassignTask(idx);
  usersRepo.deleteRecord(idx);
};

module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
