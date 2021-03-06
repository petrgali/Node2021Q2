import { config } from 'dotenv'
import path from 'path'

config({
  path: path.join(__dirname, '../../.env'),
})
export const { PORT, NODE_ENV, JWT_SECRET_KEY } = process.env
export { INFO, ERRORS, FATAL, LOG_FOLDER }

const LOG_FOLDER = 'logs'
const INFO = `${LOG_FOLDER}/info.txt`
const ERRORS = `${LOG_FOLDER}/errors.txt`
const FATAL = `${LOG_FOLDER}/fatal.txt`


