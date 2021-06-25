import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { STATUS, MSG } from '../common/const'
import { serviceAPI } from '../resources/login/login.service'
import { LogError } from './error.logger.interface'
//@ts-ignore
export const sessionValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token || token.split(' ')[0] !== 'Bearer')
            throw (new LogError(STATUS.UNATHORIZED, MSG.NO_TOKEN, { req, res }))
        let decoded
        if (!!token.split(' ')[1]) {
            decoded = jwt.verify(String(token.split(' ')[1]), 'some_secret_phrase')
        }
        if (decoded) {
            //@ts-ignore
            const user = await serviceAPI.findById(decoded.userId)
            if (user) {
                req.headers.authorization = 'Bearer ' + token
                next()
            }
        }
    } catch (err) {
        next(new LogError(STATUS.UNATHORIZED, MSG.UNATHORIZED, { req, res }))
    }
}
