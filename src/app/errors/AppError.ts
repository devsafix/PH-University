class AppError extends Error {
    public statusCode: number | undefined
    constructor(statuscode: number, message: string, stack = '') {
        super(message)
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export default AppError