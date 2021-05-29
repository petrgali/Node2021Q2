/** @module userService */
import { IUser, IUserRaw } from './user.model'
const API = require('./user.memory.repository').userAPI;
const { taskAPI } = require('../tasks/task.memory.repository');
/**
 * Collection of methods to operate with DB controller
 * @type {Object}
 */
const serviceAPI = {
  /**
   * Redirect call to userAPI {@link module:userAPI.getAll}
   * @memberof module:userService
   * @returns {Promise<User[]>}}
   */
  getAll: (): Array<IUser> => API.getAll(),
  /**
   * Redirect call to userAPI {@link module:userAPI.getById}
   * @memberof module:userService
   * @param {String} [idx] - Specified user id to show
   * @returns {Promise<User>}
   */
  getById: (idx: string | undefined): IUser => API.getById(idx),
  /**
   * Redirect call to userAPI {@link module:userAPI.addNewRecord}
   * @memberof module:userService
   * @param {Object} data - Data to create a new User
   * @param {String} [data.name] - User name
   * @param {String} [data.login] - User login
   * @param {String} [data.password] - User password
   * @returns {Promise<void>}
   */
  addNewRecord: (data: IUser): void => {
    API.addNewRecord(data);
  },
  /**
   * Redirect call to userAPI {@link module:userAPI.updateRecord}
   * @memberof module:userService
   * @param {Object} body - User data to update
   * @param {String} [body.name] - Updated user name
   * @param {String} [body.login] - Updated user login
   * @param {String} [body.password] - Updated user password
   * @param {Object} params - Specified user info
   * @param {string} params.id - Specified user id to update
   * @returns {Promise<User>}
   */
  updateRecord: (body: IUserRaw, idx: string | undefined): IUser => {
    const update = {
      name: body.name,
      login: body.login,
      password: body.password,
    };
    API.updateRecord(idx, update);
    return serviceAPI.getById(idx);
  },
  /**
   * Redirect call to userAPI {@link module:userAPI.deleteRecord} and {@link module:taskAPI.unassignTask}
   * @memberof module:userService
   * @param {String} idx - Specified user id to remove
   * @returns {Promise<void>}
   */
  deleteRecord: (idx: string | undefined): void => {
    taskAPI.unassignTask(idx);
    API.deleteRecord(idx);
  },
};
module.exports = { serviceAPI };
