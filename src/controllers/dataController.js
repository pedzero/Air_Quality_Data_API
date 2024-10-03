import bufferService from '../services/dataBufferService.js'

const controller = {}

controller.create = (request, response) => {
    const data = request.body
    try {
        bufferService.addDataToBuffer(data)
        response.sendStatus(200)
    } catch (error) {
        response.status(400).json({ error: "Bad request", message: error.message })
    }
}

export default controller