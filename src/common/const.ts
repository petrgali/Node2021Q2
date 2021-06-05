export { STATUS, MSG }
const STATUS = {
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    OK: 200,
    CREATED: 201,
    SUCCESS: 204
}
const MSG = {
    INTERNAL: 'Internal server error',
    NOT_FOUND: 'Requested data not found',
    BAD: 'Bad request. Check provided data!',
    UNCAUGHT: 'Uncaught exception raised',
    UNHANDLED: 'Unhandled rejection raised',
}