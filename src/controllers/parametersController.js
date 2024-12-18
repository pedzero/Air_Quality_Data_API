import parametersService from "../services/parametersService.js"
import { ValidationError, NotFoundError } from "../errors/CustomErrors.js"

const controller = {}

controller.retrieve = async (request, response) => {
    const { city, institute, room, roomId, name, limit } = request.query

    try {
        const parameters = await parametersService.retrieve({ city, institute, room, roomId, name, limit })
        response.status(200).json(parameters)
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