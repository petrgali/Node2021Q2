import { ILogInfo } from '../middlewares/request.logger.interface'
import { LogError } from '../middlewares/error.logger.interface'
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
export const transport = {
    LOG_CUSTOM: (log: ILogInfo): void => {
        console.log(
            log.ip.split(":").slice(-1) +
            (" - ").repeat(2) +
            "[" + formatDate(log.date) + "]" +
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
            getRequestDuration(log.time).toLocaleString()
            + "ms"
        )
    },
    FATAL: (err: LogError): void => {
        console.log({
            timestamp: `[${formatDate(new Date())}]`,
            status: err.status,
            error: err.message,
            stack: err.stack
        })
    },
    ERROR: (err: LogError): void => {
        console.log({
            timestamp: `[${formatDate(new Date())}]`,
            status: err.status,
            error: err.message,
        })
    }
}