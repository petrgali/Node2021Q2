import { Request, Response, NextFunction } from "express"
import { finished } from 'stream'
import { logger } from '../../services/logger'
import { INFO } from '../../common/const'


export const requestDetails = (req: Request, res: Response, next: NextFunction): void => {
    const start = process.hrtime()
    const date = new Date()
    finished(res, () => {
        if (INFO.includes(res.statusCode)) logger.LOG_CUSTOM({ req, res, start, date })
    })
    next()
}
