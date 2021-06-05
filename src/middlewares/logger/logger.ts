import { Request, Response, NextFunction } from "express";
import { finished } from 'stream'
import { ILogInfo } from './logger.interface'


const getCurrentDate = (): string => {
    const currentDate = new Date()
    return (
        currentDate.getFullYear() +
        '-' +
        ('0' + (currentDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + currentDate.getDate()).slice(-2) +
        ':' +
        currentDate.getHours() +
        ':' +
        currentDate.getMinutes() +
        ':' +
        currentDate.getSeconds()
    )
}
const getRequestDuration = (start: [number, number]): number => {
    const SEC = 1e9
    const MS = 1e6
    const diff = process.hrtime(start)
    return (diff[0] * SEC + diff[1]) / MS
}

const format = {
    CUSTOM: (log: ILogInfo): string => {
        return (
            log.ip.split(":").slice(-1) +
            (" - ").repeat(2) +
            "[" + log.date + "]" +
            (" '") +
            log.method +
            (" ") +
            log.url +
            ("' ") +
            log.params +
            (" ") +
            log.body +
            (" ") +
            log.status +
            (" ") +
            log.time + "ms"
        )
    }
}

const logDetail = (req: Request, res: Response, next: NextFunction): void => {
    const start = process.hrtime()
    const date = getCurrentDate()
    next()
    finished(res, () => console.log(format.CUSTOM({
        ip: req.ip,
        date: date,
        method: req.method,
        url: req.baseUrl,
        status: res.statusCode,
        params: JSON.stringify(req.params),
        body: JSON.stringify(req.body),
        time: getRequestDuration(start).toLocaleString()
    }))
    )
}
export default logDetail