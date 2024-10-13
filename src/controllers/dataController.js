import bufferService from '../services/dataBufferService.js'
import { ValidationError, DataProcessingError } from '../errors/CustomErrors.js'

const controller = {}

controller.create = (request, response) => {
    const data = request.body
    try {
        if (Object.keys(data).length === 0) {
            return response.sendStatus(200) 
        }

        bufferService.addDataToBuffer(data)
        return response.sendStatus(200)
    } catch (error) {
        if (error instanceof ValidationError) {
            return response.status(error.statusCode).json({
                error: error.name, 
                message: error.message
            })
        }

        if (error instanceof DataProcessingError) {
            console.error("Data Processing Error:", error.message)
            return response.status(error.statusCode).json({
                error: error.name, 
                message: error.message
            })
        }

        console.error("Internal Server Error:", error)
        return response.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred. Please try again later."
        })
    }
}

export default controller
