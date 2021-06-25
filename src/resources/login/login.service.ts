import { getRepository } from 'typeorm'
import User from '../../entities/user.entity'

export const serviceAPI = {
    findOne: (request: User): Promise<User | undefined> =>
        getRepository(User).findOne({ where: { login: request.login } })
}