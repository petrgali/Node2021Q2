import { IUser } from './user.model'

/** @module userAPI */
const DB = require('../../common/mockDB').users;
/**
 * Collection of methods to exchange DB users data
 * @type {Object}
 */
const userAPI = {
  /**
   * Return list of all users in DB
   * @memberof module:userAPI
   * @async
   * @returns {Promise<User[]>}
   */
  getAll: async (): Promise<IUser[]> => DB,
  /**
   * Add new user to DB
   * @memberof module:userAPI
   * @async
   * @param {User} user - User class instance to add
   * @returns {Promise<number>}
   */
  addNewRecord: async (user: IUser): Promise<number> => DB.push(user),
  /**
   * Return user's data with specified id
   * @memberof module:userAPI
   * @async
   * @param {String} idx - Specified user id to show
   * @returns {Promise<User>}
   */
  getById: async (idx: string): Promise<IUser> => DB.find((user: IUser) => user.id === idx),
  /**
   * Update user data with specified id
   * @memberof module:userAPI
   * @async
   * @param {String} idx - Specified user id to update
   * @param {Object} data - User data to update
   * @returns {Promise<void>}
   */
  updateRecord: async (idx: string, data: IUser): Promise<void> => {
    const user = await userAPI.getById(idx);
    if (user) Object.assign(user, data);
  },
  /**
   * Delete user with specified id
   * @memberof module:userAPI
   * @async
   * @param {String} idx - Specified user id to remove
   * @returns {Promise<void>}
   */
  deleteRecord: async (idx: string): Promise<void> => {
    const index = DB.findIndex((record: IUser) => record.id === idx);
    DB.splice(index, 1);
  },
};

module.exports = { userAPI };
