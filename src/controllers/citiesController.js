import citiesService from "../services/citiesService.js"

import { NotFoundError, ValidationError } from "../errors/CustomErrors.js"

const controller = {}

controller.retrieve = async (request, response) => {
    const { name, id } = request.query
    try {
        const cities = await citiesService.retrieve({ name, id })
        response.status(200).json(cities)
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