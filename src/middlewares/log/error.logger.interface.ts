import { Request, Response } from 'express'
export { LogError, FatalError, IErrorInfo }

class LogError extends Error {
    public status: number
    public info: IErrorInfo
    constructor(
        status: number,
        message: string,
        info: IErrorInfo,
        stack?: string
    ) {
        super()
        this.status = status
        this.message = message
        this.info = info
        this.stack = stack
    }
}

class FatalError extends Error {
    public status: number
    constructor(
        status: number,
        message: string
    ) {
        super()
        this.status = status
        this.message = message
    }
}

interface IErrorInfo {
    req: Request,
    res: Response,
}
