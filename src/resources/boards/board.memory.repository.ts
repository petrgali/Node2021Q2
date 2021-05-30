import { IBoard, IBoardRaw } from "./board.model";
const DB = require('../../common/mockDB').boards;

const boardAPI = {
  getAll: async (): Promise<IBoard[]> => DB,

  getById: async (idx: string | undefined): Promise<IBoard> => DB.find((board: IBoard) => board.id === idx),

  addNewRecord: async (board: IBoard): Promise<number> => DB.push(board),

  updateRecord: async (idx: string | undefined, data: IBoardRaw): Promise<void> => {
    const board: IBoard = await boardAPI.getById(idx);
    if (board) Object.assign(board, data);
  },

  deleteRecord: async (idx: string | undefined): Promise<void> => {
    const index: number = DB.findIndex((record: IBoard) => record.id === idx);
    DB.splice(index, 1);
  },
};

export default boardAPI
