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
  getAll: async () => DB,
  /**
   * Add new user to DB
   * @memberof module:userAPI
   * @async
   * @param {User} user - User class instance to add
   * @returns {Promise<number>}
   */
  addNewRecord: async (user) => DB.push(user),
  /**
   * Return user's data with specified id
   * @memberof module:userAPI
   * @async
   * @param {String} idx - Specified user id to show
   * @returns {Promise<User>}
   */
  getById: async (idx) => DB.find((user) => user.id === idx),
  /**
   * Update user data with specified id
   * @memberof module:userAPI
   * @async
   * @param {String} idx - Specified user id to update
   * @param {Object} data - User data to update
   * @returns {Promise<void>}
   */
  updateRecord: async (idx, data) => {
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
  deleteRecord: async (idx) => {
    const index = DB.findIndex((record) => record.id === idx);
    DB.splice(index, 1);
  },
};

module.exports = { userAPI };
