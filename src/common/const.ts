export { STATUS, MSG, INFO }
const STATUS = {
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    OK: 200,
    CREATED: 201,
    SUCCESS: 204,
    UNATHORIZED: 401,
    FORBIDDEN: 403
}
const MSG = {
    INTERNAL: 'Internal server error',
    NOT_FOUND: 'Requested data not found',
    BAD: 'Bad request. Check provided data!',
    UNCAUGHT: 'Uncaught exception raised',
    UNHANDLED: 'Unhandled rejection raised',
    USER_NOT_FOUND: 'Requested user not found',
    UNATHORIZED: 'Access unathorized',
    PWD_FAILED: "Password doesn't match",
    NO_TOKEN: 'No token provided'
}

const INFO = [200, 201, 204]
