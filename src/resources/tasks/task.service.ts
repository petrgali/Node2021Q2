import { ITask, ITaskRaw } from "./task.model";

const API = require('./task.memory.repository').taskAPI;
const Task = require('./task.model');
/** @module taskService */
/**
 * Collection of methods to operate with DB controller
 * @type {Object}
 */
const serviceAPI = {
  /**
   * Redirect call to taskAPI {@link module:taskAPI.getBoardTasks}
   * @memberof module:taskService
   * @param {String} idx - Board id to show all tasks belongs to
   * @returns {Promise<Task[]>}
   */
  getBoardTasks: (idx: string): Array<ITask> => API.getBoardTasks(idx),
  /**
   * Redirect call to taskAPI {@link module:taskAPI.addBoardTask}
   * @memberof module:taskService
   * @param {Object} data - Data to create a new Task
   * @param {String} [data.body.title] - Task title
   * @param {Number} [data.body.order] - Task order
   * @param {String} [data.body.description] - Task description
   * @param {String} [data.body.userId] - Task assignee
   * @param {String} [data.params.boardId] - Task board belongs to
   * @param {String} [data.body.columnId] - Task column
   * @returns {Promise<Task>}}
   */
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
  /**
   * Redirect call to taskAPI {@link module:taskAPI.getTaskById}
   * @memberof module:taskService
   * @param {Object} params - Task and board properties
   * @param {String} params.boardId - Specified boardId
   * @param {String} params.taskId - Specified taskId
   * @returns {Promise<Task>}}
   */
  getTaskById: (boardId: string, taskId: string): ITask =>
    API.getTaskById(boardId, taskId),
  /**
   * Redirect call to taskAPI {@link module:taskAPI.updateTask}
   * @memberof module:taskService
   * @param {Object} body - task data to update
   * @param {String} [body.title] - Updated task title
   * @param {Number} [body.order] - Updated task order
   * @param {String} [body.description] - Updated task description
   * @param {String} [body.userId] - Updated task userId
   * @param {String} [body.boardId] - Updated task boardId
   * @param {String} [body.columnId] - Updated task columnId
   * @param {Object} params - Task and board properties
   * @param {String} params.boardId - Specified boardId
   * @param {String} params.taskId - Specified taskId
   * @returns {Promise<Task>}
   */
  updateTask: (data: ITaskRaw, boardId: string, taskId: string): ITask => {
    const update: ITaskRaw = {
      ...data
    };
    // const params = {
    //   board: options.boardId,
    //   task: options.taskId,
    // };
    API.updateTask(boardId, taskId, update);
    return serviceAPI.getTaskById(boardId, taskId);
  },
  /**
   * * Redirect call to taskAPI {@link module:taskAPI.deleteTask}
   * @memberof module:taskService
   * @param {Object} params - Task and board properties
   * @param {String} params.boardId - Specified boardId
   * @param {String} params.taskId - Specified taskId
   * @returns {Promise<void>}
   */
  deleteTask: (_boardId: string, taskId: string): void =>
    API.deleteTask(taskId)
};

module.exports = { serviceAPI };
