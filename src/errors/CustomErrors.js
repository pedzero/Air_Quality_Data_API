class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.name = "BadRequestError"
        this.statusCode = 400
    }
}

class DataProcessingError extends Error {
    constructor(message) {
        super(message)
        this.name = "DataProcessingError"
        this.statusCode = 500
    }
}

class ValidationError extends BadRequestError {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

export { BadRequestError, DataProcessingError, ValidationError, NotFoundError }
