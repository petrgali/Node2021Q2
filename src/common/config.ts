import { config } from 'dotenv';
import path from 'path';

config({
  path: path.join(__dirname, '../../.env'),
});
export const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE } = process.env
export { INFO, ERRORS, FATAL }

const INFO = 'logs/info.txt'
const ERRORS = 'logs/errors.txt'
const FATAL = 'logs/fatal.txt'

