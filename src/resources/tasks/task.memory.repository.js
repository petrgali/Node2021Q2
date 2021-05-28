/** @module taskAPI */
const DB = require('../../common/mockDB').tasks;
/**
 *Collection of methods to exchange DB tasks data
 * @type {Object}
 */
const taskAPI = {
  /**
   * Return list of tasks belongs to board with specified id
   * @memberof module:taskAPI
   * @async
   * @param {String} idx - Board id to show all tasks belongs to
   * @returns {Promise<Task[]>}
   */
  getBoardTasks: async (idx) => DB.filter((record) => record.boardId === idx),
  /**
   * Add new task to DB
   * @memberof module:taskAPI
   * @async
   * @param {Task} task - Task class instance to add
   * @returns {Promise<number>}
   */
  addBoardTask: async (task) => DB.push(task),
  /**
   * Return task with specified id belongs to board with specified id
   * @memberof module:taskAPI
   * @async
   * @param {Object} params - Specified id's of board and task
   * @param {String} params.board- Board id
   * @param {String} params.task - Task id
   * @returns {Promise<Task>}
   */
  getTaskById: async (params) => {
    const tasks = await taskAPI.getBoardTasks(params.board);
    const task = tasks.find((record) => record.id === params.task);
    return task;
  },
  /**
   * Update task with specified id belongs to board with specified id
   * @memberof module:taskAPI
   * @async
   * @param {Object} params - Specified id's of board and task
   * @param {String} params.board - Board id
   * @param {String} params.task - Task id
   * @param {Object} data - Task info to update
   * @returns {Promise<void>}
   */
  updateTask: async (params, data) => {
    const task = await taskAPI.getTaskById(params);
    if (task) Object.assign(task, data);
  },
  /**
   * Remove task with specified id belongs to board with specified id
   * @memberof module:taskAPI
   * @async
   * @param {Object} params - Specified id's of board and task
   * @param {String} params.board - Board id
   * @param {String} params.task - Task id
   * @returns {Promise<void>}
   */
  deleteTask: async (params) => {
    const idx = DB.findIndex((task) => task.id === params.task);
    DB.splice(idx, 1);
  },
  /**
   * Remove all task belongs to board with specified id
   * @memberof module:taskAPI
   * @async
   * @param {String} idx - Board id to delete all tasks belongs to
   * @returns {Promise<void>}
   */
  deleteBoardTasks: async (idx) => {
    const records = [];
    DB.map((task, id) => {
      if (task.boardId === idx) {
        records.push(id);
        return true;
      }
      return false;
    });
    records.map((id) => taskAPI.deleteTask(id));
  },
  /**
   * Unassign all tasks of specified user
   * @memberof module:taskAPI
   * @async
   * @param {String} idx - User id to unassign all tasks belongs to
   * @returns {Promise<void>}
   */
  unassignTask: async (idx) => {
    DB.filter((task) =>
      task.userId === idx ? Object.assign(task, { userId: null }) : false
    );
  },
};
module.exports = { taskAPI };
