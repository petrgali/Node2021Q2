const taskRepo = require('./task.memory.repository');

const getBoardTasks = (idx) => taskRepo.getBoardTasks(idx);
const addBoardTask = (task) => taskRepo.addBoardTask(task);
const getTaskById = (params) => taskRepo.getTaskById(params);
const updateTask = (params, data) => taskRepo.updateTask(params, data);
const deleteTask = (params) => taskRepo.deleteTask(params);

module.exports = {
  getBoardTasks,
  addBoardTask,
  getTaskById,
  updateTask,
  deleteTask,
};
