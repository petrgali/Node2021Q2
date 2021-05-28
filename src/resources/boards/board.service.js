const API = require('./board.memory.repository').boardAPI;
const { taskAPI } = require('../tasks/task.memory.repository');
const Board = require('./board.model');
const Column = require('../columns/columns.model');
/** @module boardService */
/**
 * Collection of methods to operate with DB controller
 * @type {Object}
 */
const serviceAPI = {
  /**
   * Redirect call to boardAPI {@link module:boardAPI.getAll}
   * @memberof module:boardService
   * @returns {Promise<Board[]>}}
   */
  getAll: () => API.getAll(),
  /**
   * Redirect call to boardAPI {@link module:boardAPI.getById}
   * @memberof module:boardService
   * @param {String} idx - Specified board id to show
   * @returns {Promise<Board>}
   */
  getById: (idx) => API.getById(idx),
  /**
   * Redirect call to boardAPI {@link module:boardAPI.addNewRecord}
   * @memberof module:boardService
   * @param {Object} data - Data to create a new Board
   * @param {Array} [data.columns] - Board columns to add
   * @param {String} [data.columns.title] -Single column title
   * @param {Number} [data.columns.order] - Single columns order
   * @param {String} [data.title] - New board title
   * @returns {Promise<number>}
   */
  addNewRecord: (data) => {
    const columns = data.columns.map(
      (item) =>
        new Column({
          title: item.title,
          order: item.order,
        })
    );
    const board = new Board({
      title: data.title,
      columns,
    });
    API.addNewRecord(board);
    return board;
  },
  /**
   * Redirect call to boardAPI {@link module:boardAPI.updateRecord}
   * @memberof module:boardService
   * @param {Object} data - Data to update the board
   * @param {String} data.params.id - Board id to get
   * @param {String} [data.body.title] - Board title to update
   * @returns {Promise<Board>}
   */
  updateRecord: async (data) => {
    const board = await serviceAPI.getById(data.params.id);
    const { columns } = board;
    const update = {
      title: data.body.title,
      columns,
    };
    await API.updateRecord(data.params.id, update);
    return serviceAPI.getById(data.params.id);
  },
  /**
   * Redirect call to boardAPI {@link module:boardAPI.deleteRecord} and {@link module:taskAPI.deleteBoardTasks}
   * @memberof module:boardService
   * @param {String} idx - Specified board id to remove
   * @returns {Promise<void>}
   */
  deleteRecord: async (idx) => {
    await taskAPI.deleteBoardTasks(idx);
    API.deleteRecord(idx);
  },
};
module.exports = { serviceAPI };
