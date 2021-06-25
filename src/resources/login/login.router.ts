import { NextFunction, Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serviceAPI } from './login.service'
import { STATUS, MSG } from '../../common/const'
import { LogError } from '../../middlewares/error.logger.interface'

const router = Router()

router
    .route('/')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        const registered = await serviceAPI.findOne(req.body)
        if (registered) {
            const match = await bcrypt.compare(req.body.password, registered.password)
            if (match) {
                const token = jwt.sign({ userId: registered.id, login: registered.login }, 'some_secret_phrase', { expiresIn: 60 * 60 })
                return res.status(STATUS.OK).send({
                    token: token
                })
            }
            next(new LogError(STATUS.FORBIDDEN, MSG.PWD_FAILED, { req, res }))
            return
        }
        next(new LogError(STATUS.FORBIDDEN, MSG.USER_NOT_FOUND, { req, res }))
        return
    })

export default router