import { IUser, IUserRaw } from './user.model'
import API from './user.memory.repository'
import taskAPI from '../tasks/task.memory.repository'

export const serviceAPI = {
  getAll: (): Promise<Array<IUser>> => API.getAll(),

  getById: (idx: string | undefined): Promise<IUser | undefined> => API.getById(idx),

  addNewRecord: (data: IUser): void => {
    API.addNewRecord(data)
  },

  updateRecord: (body: IUserRaw, idx: string | undefined): Promise<IUser | undefined> => {
    const update = {
      name: body.name,
      login: body.login,
      password: body.password,
    }
    API.updateRecord(idx, update)
    return serviceAPI.getById(idx)
  },

  deleteRecord: (idx: string | undefined): void => {
    taskAPI.unassignTask(idx)
    API.deleteRecord(idx)
  },
}
