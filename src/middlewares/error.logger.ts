import { Request, Response, NextFunction } from 'express'
import { transport } from '../services/formatter'
import { LogError } from './error.logger.interface'
import { STATUS, MSG } from '../common/const'

const uncaught = process.on('uncaughtException', (err: Error) => {
   transport.FATAL(new LogError(STATUS.SERVER_ERROR, MSG.UNCAUGHT, err.stack))
   process.exit(1)
})
const unhandled = process.on('unhandledRejection', (err: Error) => {
   transport.FATAL(new LogError(STATUS.SERVER_ERROR, MSG.UNHANDLED, err.stack))
   process.exit(1)
})
const errorDetails = (err: LogError, _req: Request, res: Response, next: NextFunction): void => {
   const custom = new LogError(err.status, err.message)
   res.status(custom.status).json({
      error: custom.message,
      status: custom.status
   })
   res.on('finish', () => transport.ERROR(custom))
   next()
}

export {
   uncaught,
   unhandled,
   errorDetails
}