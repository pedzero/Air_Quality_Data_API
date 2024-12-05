import roomsService from "../services/roomsService.js"
import { ValidationError, NotFoundError } from "../errors/CustomErrors.js"

const controller = {}

controller.retrieve = async (request, response) => {
    const { city, institute, name, instituteId, id } = request.query

    try {
        const rooms = await roomsService.retrieve({ city, institute, name, instituteId, id })
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

controller.destroy = async (request, response) => {
    const { id } = request.query
    const { password } = request.body
    try {
        if (!id || !password) {
            throw new ValidationError("Please provide an 'id' in query params and 'password' in body.")
        }
        const correctPassword = process.env.DELETE_PASSWORD || 'admin';
        const isPasswordValid = correctPassword === password

        if (!isPasswordValid) {
            throw new ValidationError("Invalid Password")
        }

        const result = await roomsService.destroy({ id })
        response.status(200).send({ message: result })
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