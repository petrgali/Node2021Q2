import { DeleteResult, getRepository } from 'typeorm'
import User from '../../entities/user.entity'
import { UserDTO } from '../../common/types'

const userAPI = {
  getAll: async (): Promise<User[]> => getRepository(User).find(),

  getById: async (idx: string): Promise<User | undefined> => getRepository(User).findOne(idx),

  addNewRecord: async (user: UserDTO): Promise<User> => {
    const newUser = getRepository(User).create(user)
    const saved = getRepository(User).save(newUser)
    return saved
  },

  updateRecord: async (idx: string, data: UserDTO): Promise<User> =>
    (await getRepository(User).update(idx, data)).raw,

  deleteRecord: async (idx: string): Promise<DeleteResult> => getRepository(User).delete(idx),
}

export default userAPI
