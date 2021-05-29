/** @module taskAPI */
import { ITask, ITaskRaw } from './task.model';
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
  getBoardTasks: async (idx: string): Promise<Array<ITask>> => DB.filter((record: ITask) => record.boardId === idx),
  /**
   * Add new task to DB
   * @memberof module:taskAPI
   * @async
   * @param {Task} task - Task class instance to add
   * @returns {Promise<number>}
   */
  addBoardTask: async (task: ITask): Promise<ITask> => DB.push(task),
  /**
   * Return task with specified id belongs to board with specified id
   * @memberof module:taskAPI
   * @async
   * @param {Object} params - Specified id's of board and task
   * @param {String} params.board- Board id
   * @param {String} params.task - Task id
   * @returns {Promise<Task>}
   */
  getTaskById: async (boardId: string, taskId: string): Promise<ITask | undefined> => {
    const tasks = await taskAPI.getBoardTasks(boardId);
    const task = tasks.find((record) => record.id === taskId);
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
  updateTask: async (boardId: string, taskId: string, data: ITaskRaw): Promise<void> => {
    // const params = {
    //   board: boardId,
    //   task: taskId,
    // };
    const task = await taskAPI.getTaskById(boardId, taskId);
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
  deleteTask: async (taskId: string): Promise<void> => {
    const idx: number = DB.findIndex((task: ITask) => task.id === taskId);
    DB.splice(idx, 1);
  },
  /**
   * Remove all task belongs to board with specified id
   * @memberof module:taskAPI
   * @async
   * @param {String} idx - Board id to delete all tasks belongs to
   * @returns {Promise<void>}
   */
  deleteBoardTasks: async (idx: string): Promise<void> => {
    const records: Array<string> = [];
    DB.map((task: ITask, id: string) => {
      if (task.boardId === idx) {
        records.push(id);
        return true;
      }
      return false;
    });
    records.map((id: string) => taskAPI.deleteTask(id));
  },
  /**
   * Unassign all tasks of specified user
   * @memberof module:taskAPI
   * @async
   * @param {String} idx - User id to unassign all tasks belongs to
   * @returns {Promise<void>}
   */
  unassignTask: async (idx: string): Promise<void> => {
    DB.filter((task: ITask) =>
      task.userId === idx ? Object.assign(task, { userId: null }) : false
    );
  },
};
module.exports = { taskAPI };
