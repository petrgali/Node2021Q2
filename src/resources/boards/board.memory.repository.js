/** @module boardAPI */
const DB = require('../../common/mockDB').boards;
/**
 * Collection of methods to exchange DB boards data
 * @type {Object}
 */
const boardAPI = {
  /**
   * Return list of all boards in DB
   * @memberof module:boardAPI
   * @async
   * @returns {Promise<Board[]>}
   */
  getAll: async () => DB,
  /**
   * Return board with specefied id
   * @memberof module:boardAPI
   * @async
   * @param {String} idx - Specified board idx to show
   * @returns {Promise<Board>}
   */
  getById: async (idx) => DB.find((board) => board.id === idx),
  /**
   * Add a new board to DB
   * @memberof module:boardAPI
   * @async
   * @param {Board} data - Board class instance to add
   * @returns {Promise<number>}
   */
  addNewRecord: async (data) => DB.push(data),
  /**
   * Update data in board with specified idx
   * @memberof module:boardAPI
   * @async
   *  @param {String} idx - Board id to update
   * @param {Object} data - Board info to update
   * @returns {Promise<void>}
   */
  updateRecord: async (idx, data) => {
    const board = await boardAPI.getById(idx);
    if (board) Object.assign(board, data);
  },
  /**
   * Remove board with specified idx
   * @memberof module:boardAPI
   * @async
   * @param {String} idx - Board id to remove
   * @returns {Promise<void>}
   */
  deleteRecord: async (idx) => {
    const index = DB.findIndex((record) => record.id === idx);
    DB.splice(index, 1);
  },
};

module.exports = { boardAPI };
