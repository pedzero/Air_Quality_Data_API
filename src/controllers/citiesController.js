import citiesService from "../services/citiesService.js"

const controller = {}

controller.retrieve = async (request, response) => {
    const { name } = request.query
    try {
        const cities = await citiesService.retrieve({ name })
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