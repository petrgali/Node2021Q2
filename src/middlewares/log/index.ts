import { requestDetails } from './request.logger'
import { errorDetails, unhandled, uncaught } from './error.logger'

const logger = {
    requestDetails,
    errorDetails,
    uncaught,
    unhandled
}
export default logger
