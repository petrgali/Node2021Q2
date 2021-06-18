// import { IUserRaw } from '../../entities/user.entity'
import { UserDTO } from '../../common/types'
import API from './user.memory.repository'
import taskAPI from '../tasks/task.memory.repository'
import { DeleteResult } from 'typeorm'
import User from '../../entities/user.entity'

export const serviceAPI = {
  getAll: (): Promise<User[]> => API.getAll(),

  getById: (idx: string): Promise<User | undefined> => API.getById(idx),

  addNewRecord: (data: UserDTO): Promise<User> => API.addNewRecord(data),

  updateRecord: (body: UserDTO, idx: string): Promise<User | undefined> => {
    const update: UserDTO = {
      name: body.name,
      login: body.login,
      password: body.password,
    }
    API.updateRecord(idx, update)
    return serviceAPI.getById(idx)
  },

  deleteRecord: (idx: string): Promise<DeleteResult> => {
    taskAPI.unassignTask(idx)
    return API.deleteRecord(idx)
  },
}
