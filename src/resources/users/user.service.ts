import { DeleteResult } from 'typeorm'
import { UserDTO } from '../../common/types'
import User from '../../entities/user.entity'
import taskAPI from '../tasks/task.memory.repository'
import API from './user.memory.repository'

export const serviceAPI = {
  getAll: (): Promise<User[]> => API.getAll(),

  getById: (idx: string): Promise<User | undefined> => API.getById(idx),

  addNewRecord: (data: UserDTO): Promise<User> => API.addNewRecord(data),

  updateRecord: (body: UserDTO, idx: string): Promise<User | undefined> => {
    const { name, login, password } = body
    API.updateRecord(idx, { name, login, password })
    return serviceAPI.getById(idx)
  },

  deleteRecord: (idx: string): Promise<DeleteResult> => {
    taskAPI.unassignTask(idx)
    return API.deleteRecord(idx)
  },
}
