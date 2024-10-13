import roomsService from "../services/roomsService.js"
import { ValidationError, NotFoundError } from "../errors/CustomErrors.js"

const controller = {}

controller.retrieveAll = async (request, response) => {
    const { city, institute } = request.query

    try {
        if (!city?.trim() || !institute?.trim()) {
            throw new ValidationError("Missing required query parameters. Please provide 'city' and 'institute' in the query string.")
        }
        const rooms = await roomsService.retrieveAll(city, institute)
        response.status(200).json(rooms)
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