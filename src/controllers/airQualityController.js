import airQualityService from '../services/airQualityService.js'
import { ValidationError, NotFoundError } from '../errors/CustomErrors.js'

const controller = {}

controller.generate = async (request, response) => {
    const { city, institute, room } = request.query

    try {
        if (!city?.trim() || !institute?.trim() || !room?.trim()) {
            throw new ValidationError("Missing required query parameters. Please provide 'city', 'institute', and 'room' in the query string.")
        }
        const aqiData = await airQualityService.calculateIAQ(city, institute, room)
        return response.status(200).json(aqiData)
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
