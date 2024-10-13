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

export { BadRequestError, DataProcessingError, ValidationError }
