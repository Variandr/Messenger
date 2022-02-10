module.exports = class ErrorHandler extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ErrorHandler(401, "User unauthorized")
    }

    static BadRequest(message, errors = []) {
        return new ErrorHandler(400, message, errors)
    }
}