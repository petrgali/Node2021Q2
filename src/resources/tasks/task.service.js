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
   * @returns {Promise<Task[]>}}
   */
  getBoardTasks: (idx) => API.getBoardTasks(idx),
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
  /**
   * Redirect call to taskAPI {@link module:taskAPI.getTaskById}
   * @memberof module:taskService
   * @param {Object} params - Task and board properties
   * @param {String} params.boardId - Specified boardId
   * @param {String} params.taskId - Specified taskId
   * @returns {Promise<Task>}}
   */
  getTaskById: (params) =>
    API.getTaskById({
      board: params.boardId,
      task: params.taskId,
    }),
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
  /**
   * * Redirect call to taskAPI {@link module:taskAPI.deleteTask}
   * @memberof module:taskService
   * @param {Object} params - Task and board properties
   * @param {String} params.boardId - Specified boardId
   * @param {String} params.taskId - Specified taskId
   * @returns {Promise<void>}
   */
  deleteTask: (params) =>
    API.deleteTask({
      board: params.boardId,
      task: params.taskId,
    }),
};

module.exports = { serviceAPI };
