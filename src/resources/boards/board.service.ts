import { IBoard, IBoardRaw } from './board.model';
import { IColumn, IColumnRaw } from '../columns/columns.model'
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
  getAll: (): Array<IBoard> => API.getAll(),
  /**
   * Redirect call to boardAPI {@link module:boardAPI.getById}
   * @memberof module:boardService
   * @param {String} idx - Specified board id to show
   * @returns {Promise<Board>}
   */
  getById: (idx: string): IBoard => API.getById(idx),
  /**
   * Redirect call to boardAPI {@link module:boardAPI.addNewRecord}
   * @memberof module:boardService
   * @param {Object} data - Data to create a new Board
   * @param {Array} [data.columns] - Board columns to add
   * @param {String} [data.columns.title] -Single column title
   * @param {Number} [data.columns.order] - Single columns order
   * @param {String} [data.title] - New board title
   * @returns {Promise<Board>}
   */
  addNewRecord: (title: string, columns: Array<IColumnRaw>): IBoard => {
    const newColumns: Array<IColumn> = columns.map(
      (item: IColumnRaw) =>
        new Column({
          title: item.title,
          order: item.order,
        })
    );
    const board: IBoard = new Board({
      title: title,
      columns: newColumns,
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
  updateRecord: async (id: string, title: string): Promise<IBoard> => {
    const board = await serviceAPI.getById(id);
    const { columns } = board;
    const update: IBoardRaw = {
      title: title,
      columns,
    };
    API.updateRecord(id, update);
    return serviceAPI.getById(id);
  },
  /**
   * Redirect call to boardAPI {@link module:boardAPI.deleteRecord} and {@link module:taskAPI.deleteBoardTasks}
   * @memberof module:boardService
   * @param {String} idx - Specified board id to remove
   * @returns {Promise<void>}
   */
  deleteRecord: async (idx: string): Promise<void> => {
    await taskAPI.deleteBoardTasks(idx);
    API.deleteRecord(idx);
  },
};
module.exports = { serviceAPI };
