import { getRepository } from 'typeorm'
import User from '../../entities/user.entity'

export const serviceAPI = {
    
    findByLogin: (login: string): Promise<User | undefined> =>
        getRepository(User).findOne({ where: { login: login } }),

    findById: (token: string): Promise<User | undefined> =>
        getRepository(User).findOne(token)
}