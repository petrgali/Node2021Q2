import { IBoard, IBoardRaw } from './board.model';
import { IColumn, IColumnRaw } from '../columns/columns.model'
const API = require('./board.memory.repository').boardAPI;
const { taskAPI } = require('../tasks/task.memory.repository');
const Board = require('./board.model');
const Column = require('../columns/columns.model');

const serviceAPI = {
  getAll: (): Array<IBoard> => API.getAll(),
  getById: (idx: string): IBoard => API.getById(idx),
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
  deleteRecord: async (idx: string): Promise<void> => {
    await taskAPI.deleteBoardTasks(idx);
    API.deleteRecord(idx);
  },
};
module.exports = { serviceAPI };
