import { Request, Response, NextFunction } from "express";
import { finished } from 'stream'
import { transport } from '../services/formatter'


export const requestDetails = (req: Request, res: Response, next: NextFunction): void => {
    const start = process.hrtime()
    const date = new Date()
    next()
    finished(res, () => transport.LOG_CUSTOM({
        ip: req.ip,
        date: date,
        method: req.method,
        url: req.baseUrl,
        status: res.statusCode,
        params: JSON.stringify(req.params),
        body: JSON.stringify(req.body),
        time: start
    })
    )
}
