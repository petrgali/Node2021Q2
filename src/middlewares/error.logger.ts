import { Request, Response, NextFunction } from 'express'
import { logger } from '../services/logger'
import { FatalError, LogError } from './error.logger.interface'
import { STATUS } from '../common/const'

const uncaught = process.on('uncaughtException', (err: Error) => {
   logger.FATAL(new FatalError(STATUS.SERVER_ERROR, err.message))
   process.exit(1)
})
const unhandled = process.on('unhandledRejection', (err: Error) => {
   logger.FATAL(new FatalError(STATUS.SERVER_ERROR, err.message))
   process.exit(1)
})
const errorDetails = (err: LogError, req: Request, res: Response, next: NextFunction): void => {
   const info = { req, res }
   const custom = new LogError(err.status || STATUS.SERVER_ERROR, err.message, info, err.stack)
   logger.ERROR(custom)
   res.status(custom.status).json({
      error: custom.message,
      status: custom.status
   })
   next()
}

export {
   uncaught,
   unhandled,
   errorDetails
}