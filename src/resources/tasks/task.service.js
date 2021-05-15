const taskRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getBoardTasks = (idx) => taskRepo.getBoardTasks(idx);
const addBoardTask = (data) => {
  const task = new Task({
    title: data.body.title,
    order: data.body.order,
    description: data.body.description,
    userId: data.body.userId,
    boardId: data.params.boardId,
    columnId: data.body.columnId,
  });
  taskRepo.addBoardTask(task);
  return task;
};
const getTaskById = (params) =>
  taskRepo.getTaskById({
    board: params.boardId,
    task: params.taskId,
  });
const updateTask = (body, options) => {
  const update = {
    title: body.title,
    order: body.order,
    description: body.description,
    userId: body.userId,
    boardId: body.boardId,
    columnId: body.columnId,
  };
  const params = {
    board: options.boardId,
    task: options.taskId,
  };
  taskRepo.updateTask(params, update);
  return getTaskById(params);
};
const deleteTask = (params) =>
  taskRepo.deleteTask({
    board: params.boardId,
    task: params.taskId,
  });

module.exports = {
  getBoardTasks,
  addBoardTask,
  getTaskById,
  updateTask,
  deleteTask,
};
