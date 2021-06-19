import { DeleteResult } from 'typeorm'
import { UserDTO } from '../../common/types'
import User from '../../entities/user.entity'
import API from './user.memory.repository'

export const serviceAPI = {
  getAll: (): Promise<User[]> => API.getAll(),

  getById: (idx: string): Promise<User | undefined> => API.getById(idx),

  addNewRecord: (data: UserDTO): Promise<User> => API.addNewRecord(data),

  updateRecord: async (body: UserDTO, idx: string): Promise<User | undefined> => {
    const { name, login, password } = body
    await API.updateRecord(idx, { name, login, password })
    return API.getById(idx)
  },

  deleteRecord: (idx: string): Promise<DeleteResult> => {
    return API.deleteRecord(idx)
  },
}
