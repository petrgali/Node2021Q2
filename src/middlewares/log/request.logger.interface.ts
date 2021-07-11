import { Request, Response } from 'express'
export { ILogInfo }

interface ILogInfo {
    req: Request,
    res: Response,
    start: [number, number],
    date: Date
}