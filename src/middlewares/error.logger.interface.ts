import { STATUS, MSG } from '../common/const'

export { LogError }


class LogError extends Error {
    public status: number
    constructor(
        status: number = STATUS.SERVER_ERROR,
        message: string = MSG.INTERNAL,
        stack?: string
    ) {
        super()
        this.status = status
        this.message = message
        this.stack = stack
    }
}
