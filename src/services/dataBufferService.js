import parseRawData from '../utils/dataParser.js'
import dataService from './dataService.js'
import { ValidationError, DataProcessingError } from '../errors/CustomErrors.js'

let buffer = []

const addDataToBuffer = (data) => {
    try {
        const parsedData = parseRawData(data)

        parsedData.forEach(registry => {
            buffer.push(registry)
        })

    } catch (error) {
        if (error instanceof ValidationError) {
            throw error
        }

        throw new DataProcessingError('Error while adding data to buffer.')
    }
}

// 10s interval for storing data into database
setInterval(async () => {
    if (buffer.length > 0) {
        try {
            await dataService.store(buffer)
            buffer = []
        } catch (error) {
            console.error('Error storing buffer content in database:', error)
        }
    }
}, 10000)

export default { addDataToBuffer }
