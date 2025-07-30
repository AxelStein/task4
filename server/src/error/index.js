export class ApiError extends Error {
    constructor(
        message, 
        statusCode = 500,
        details
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
        super(message, 401)
    }
}

export class ValidationError extends ApiError {

    constructor(message = 'Validation error', data) {
        super(message, 400, data);
    }
}