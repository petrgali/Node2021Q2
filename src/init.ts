import { getRepository } from 'typeorm'
import User from './entities/user.entity'

export const createRoot = async () => {
    const admin = await getRepository(User)
        .findOne({
            login: 'admin'
        })
    if (!admin) {
        const root: User = getRepository(User)
            .create({
                login: 'admin',
                password: 'admin'
            })
        await getRepository(User).save(root)
    }
}