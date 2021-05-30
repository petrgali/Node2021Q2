import { ITask, ITaskRaw } from "./task.model";

const API = require('./task.memory.repository').taskAPI;
const Task = require('./task.model');
const serviceAPI = {
  getBoardTasks: (idx: string): Array<ITask> => API.getBoardTasks(idx),
  addBoardTask: (data: ITaskRaw, id: string): ITask => {
    const task: ITask = new Task({
      title: data.title,
      order: data.order,
      description: data.description,
      userId: data.userId,
      boardId: id,
      columnId: data.columnId,
    });
    API.addBoardTask(task);
    return task;
  },
  getTaskById: (boardId: string, taskId: string): ITask =>
    API.getTaskById(boardId, taskId),
  updateTask: (data: ITaskRaw, boardId: string, taskId: string): ITask => {
    const update: ITaskRaw = {
      ...data
    };
    API.updateTask(boardId, taskId, update);
    return serviceAPI.getTaskById(boardId, taskId);
  },
  deleteTask: (_boardId: string, taskId: string): void =>
    API.deleteTask(taskId)
};

module.exports = { serviceAPI };
