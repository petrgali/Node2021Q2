const API = require('./task.memory.repository').taskAPI;
const Task = require('./task.model');

const serviceAPI = {
  getBoardTasks: (idx) => API.getBoardTasks(idx),

  addBoardTask: (data) => {
    const task = new Task({
      title: data.body.title,
      order: data.body.order,
      description: data.body.description,
      userId: data.body.userId,
      boardId: data.params.boardId,
      columnId: data.body.columnId,
    });
    API.addBoardTask(task);
    return task;
  },
  getTaskById: (params) =>
    API.getTaskById({
      board: params.boardId,
      task: params.taskId,
    }),
  updateTask: (body, options) => {
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
    API.updateTask(params, update);
    return serviceAPI.getTaskById(params);
  },
  deleteTask: (params) =>
    API.deleteTask({
      board: params.boardId,
      task: params.taskId,
    }),
};

module.exports = { serviceAPI };
