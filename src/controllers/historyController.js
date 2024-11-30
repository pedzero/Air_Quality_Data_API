import historyService from "../services/historyService.js"
import { ValidationError, NotFoundError } from "../errors/CustomErrors.js"

const historyController = {}

historyController.getHistoricalData = async (request, response) => {
    const { roomId, parameter, aqiIncluded, start, end, precision } = request.query

    try {
        const data = await historyService.getHistoricalData({ roomId, parameter, aqiIncluded, start, end, precision })
        response.status(200).json(data)
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ValidationError) {
            return response.status(error.statusCode).json({
                error: error.name,
                message: error.message,
            })
        } else {
            console.error("Internal Server Error:", error)
            return response.status(500).json({
                error: "Internal Server Error",
                message: "An unexpected error occurred. Please try again later.",
            })
        }
    }
}

export default historyController
