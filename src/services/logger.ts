import fs from 'fs'
import { ILogInfo } from '../middlewares/request.logger.interface'
import { FatalError, LogError } from '../middlewares/error.logger.interface'
import { INFO, ERRORS, FATAL } from '../common/config'

const infoStream = fs.createWriteStream(INFO, { flags: "a" })
const errorStream = fs.createWriteStream(ERRORS, { flags: 'a' })

const formatDate = (currentDate: Date): string => {
    return (
        currentDate.getFullYear() +
        '-' +
        ('0' + (currentDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + currentDate.getDate()).slice(-2) +
        ':' +
        currentDate.getHours() +
        ':' +
        ('0' + currentDate.getMinutes()).slice(-2) +
        ':' +
        ('0' + currentDate.getSeconds()).slice(-2)
    )
}
const getRequestDuration = (start: [number, number]): number => {
    const SEC = 1e9
    const MS = 1e6
    const diff = process.hrtime(start)
    return (diff[0] * SEC + diff[1]) / MS
}
export const logger = {
    LOG_CUSTOM: ({ req, res, start, date }: ILogInfo): void => {
        infoStream.write(
            req.ip.split(":").slice(-1) +
            (" - ").repeat(2) +
            "[" + formatDate(date) + "]" +
            (" '") +
            req.method +
            (" ") +
            req.originalUrl +
            ("' ") +
            JSON.stringify(req.params) +
            (" ") +
            JSON.stringify(req.body) +
            (" ") +
            res.statusCode +
            (" ") +
            getRequestDuration(start).toLocaleString()
            + "ms\n"
        )
    },
    FATAL: (err: FatalError): void => {
        fs.appendFileSync(FATAL, JSON.stringify({
            timestamp: `[${formatDate(new Date())}]`,
            status: err.status,
            error: err.message,
            trace: err.stack
        }))
    },
    ERROR: ({ status, message, info }: LogError): void => {
        errorStream.write(JSON.stringify({
            ip: info.req.ip.split(":").slice(-1),
            timestamp: formatDate(new Date()),
            url: info.req.originalUrl,
            method: info.req.method,
            status: status,
            error: message,
        }) + '\n')
    }
}