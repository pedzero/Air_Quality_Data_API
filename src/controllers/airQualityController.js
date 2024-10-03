import airQualityService from "../services/airQualityService.js"

const controller = {}

controller.generate = async (request, response) => {
    const { city, institute, room } = request.params

    try {
        const aqiData = await airQualityService.calculateIAQ(city, institute, room)
        response.status(200).json(aqiData)
    } catch (error) {
        response.status(400).json({ error: "Bad request", message: error.message })
    }
}

export default controller