import { getRepository } from 'typeorm'
import User from './entities/user.entity'
import bcrypt from 'bcryptjs'

export const createRoot = async () => {
    const admin = await getRepository(User)
        .findOne({
            login: 'admin'
        })
    if (!admin) {
        const root: User = getRepository(User)
            .create({
                login: 'admin',
                password: bcrypt.hashSync('admin', 10)
            })
        await getRepository(User).save(root)
    }
}