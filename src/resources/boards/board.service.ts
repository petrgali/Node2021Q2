import { IBoard, IBoardRaw } from './board.model';
import { IColumn, IColumnRaw } from '../columns/columns.model'
import API from './board.memory.repository';
import taskAPI from '../tasks/task.memory.repository';
import Board from './board.model';
import Column from '../columns/columns.model';

export const serviceAPI = {
  getAll: (): Promise<Array<IBoard>> => API.getAll(),
  
  getById: (idx: string | undefined): Promise<IBoard> => API.getById(idx),
  
  addNewRecord: (title: string, data: Array<IColumnRaw>): IBoard => {
    const columns: Array<IColumn> = data.map(
      (item: IColumnRaw) =>
        new Column({
          title: item.title,
          order: item.order,
        })
    );
    const board: IBoard = new Board({
      title: title,
      columns,
    });
    API.addNewRecord(board);
    return board;
  },
  
  updateRecord: async (id: string | undefined, title: string): Promise<IBoard> => {
    const board = await serviceAPI.getById(id);
    const { columns } = board;
    const update: IBoardRaw = {
      title: title,
      columns,
    };
    API.updateRecord(id, update);
    return serviceAPI.getById(id);
  },
  
  deleteRecord: async (idx: string | undefined): Promise<void> => {
    await taskAPI.deleteBoardTasks(idx);
    API.deleteRecord(idx);
  },
};
