import citiesService from "../services/citiesService.js"

const controller = {}

controller.retrieveAll = async (request, response) => {
    try {
        const cities = await citiesService.retrieveAll()
        response.status(200).json(cities)
    } catch (error) {
        console.error("Internal Server Error:", error)
        return response.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred. Please try again later."
        })
    }
}

export default controller