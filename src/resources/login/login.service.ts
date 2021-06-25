import { getRepository } from 'typeorm'
import User from '../../entities/user.entity'

export const serviceAPI = {
    findByLogin: (request: User): Promise<User | undefined> =>
        getRepository(User).findOne({ where: { login: request.login } }),
    findById: (token: string): Promise<User | undefined> =>
        getRepository(User).findOne(token)
}