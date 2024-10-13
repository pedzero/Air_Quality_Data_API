import institutesService from "../services/institutesService.js"
import { ValidationError, NotFoundError } from "../errors/CustomErrors.js"

const controller = {}

controller.retrieveAll = async (request, response) => {
    const { city } = request.query

    try {
        if (!city?.trim()) {
            throw new ValidationError("Missing required query parameter. Please provide 'city' in the query string.")
        }
        const institutes = await institutesService.retrieveAll(city)
        response.status(200).json(institutes)
    } catch (error) {
        if (error instanceof NotFoundError) {
            return response.status(error.statusCode).json({
                error: error.name,
                message: error.message
            })
        } else if (error instanceof ValidationError) {
            return response.status(error.statusCode).json({
                error: error.name,
                message: error.message
            })
        } else {
            console.error("Internal Server Error:", error)
            return response.status(500).json({
                error: "Internal Server Error",
                message: "An unexpected error occurred. Please try again later."
            })
        }
    }
}

export default controller