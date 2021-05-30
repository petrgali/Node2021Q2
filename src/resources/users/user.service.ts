import { IUser, IUserRaw } from './user.model'
const API = require('./user.memory.repository').userAPI;
const { taskAPI } = require('../tasks/task.memory.repository');
const serviceAPI = {
  getAll: (): Array<IUser> => API.getAll(),
  getById: (idx: string | undefined): IUser => API.getById(idx),
  addNewRecord: (data: IUser): void => {
    API.addNewRecord(data);
  },
  updateRecord: (body: IUserRaw, idx: string | undefined): IUser => {
    const update = {
      name: body.name,
      login: body.login,
      password: body.password,
    };
    API.updateRecord(idx, update);
    return serviceAPI.getById(idx);
  },
  deleteRecord: (idx: string | undefined): void => {
    taskAPI.unassignTask(idx);
    API.deleteRecord(idx);
  },
};
module.exports = { serviceAPI };
