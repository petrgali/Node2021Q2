import { getRepository } from 'typeorm'
import User from './entities/user.entity'

export const createRoot = async () => {
    const root: User = getRepository(User).create({ login: 'admin', password: 'qqqq' })
    await getRepository(User).save(root)
}