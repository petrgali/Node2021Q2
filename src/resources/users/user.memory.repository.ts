import { IUser } from './user.model'

const DB = require('../../common/mockDB').users;
const userAPI = {
  getAll: async (): Promise<IUser[]> => DB,
  addNewRecord: async (user: IUser): Promise<number> => DB.push(user),
  getById: async (idx: string): Promise<IUser> => DB.find((user: IUser) => user.id === idx),
  updateRecord: async (idx: string, data: IUser): Promise<void> => {
    const user = await userAPI.getById(idx);
    if (user) Object.assign(user, data);
  },
  deleteRecord: async (idx: string): Promise<void> => {
    const index = DB.findIndex((record: IUser) => record.id === idx);
    DB.splice(index, 1);
  },
};

module.exports = { userAPI };
