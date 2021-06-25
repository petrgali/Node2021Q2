import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { STATUS, MSG } from '../../common/const'
import { serviceAPI } from '../../auth/login/login.service'
import { LogError } from '../log/error.logger.interface'
import { JWT_SECRET_KEY } from '../../common/config'
import { Token } from '../../common/types'


export const sessionValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token || token.split(' ')[0] !== 'Bearer')
            throw (new LogError(STATUS.UNATHORIZED, MSG.NO_TOKEN, { req, res }))
        let decoded
        if (!!token.split(' ')[1]) {
            decoded = jwt.verify(String(token.split(' ')[1]), String(JWT_SECRET_KEY))
        }
        if (decoded) {
            const { userId } = decoded as Token
            const user = await serviceAPI.findById(userId)
            if (user) {
                req.headers.authorization = 'Bearer ' + token
                next()
            } else {
                throw (new LogError(STATUS.UNATHORIZED, MSG.USER_NOT_FOUND, { req, res }))
            }
        } else {
            throw (new LogError(STATUS.UNATHORIZED, MSG.PWD_FAILED, { req, res }))
        }
    } catch (err) {
        next(new LogError(err.status, err.message, { req, res }))
    }
}
