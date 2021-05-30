import { IUser, IUserRaw } from './user.model'

const DB = require('../../common/mockDB').users;

const userAPI = {
  getAll: async (): Promise<IUser[]> => DB,
  
  addNewRecord: async (user: IUser): Promise<number> => DB.push(user),
  
  getById: async (idx: string | undefined): Promise<IUser> => DB.find((user: IUser) => user.id === idx),
  
  updateRecord: async (idx: string | undefined, data: IUserRaw): Promise<void> => {
    const user = await userAPI.getById(idx);
    if (user) Object.assign(user, data);
  },
  
  deleteRecord: async (idx: string | undefined): Promise<void> => {
    const index = DB.findIndex((record: IUser) => record.id === idx);
    DB.splice(index, 1);
  },
};

export default userAPI
