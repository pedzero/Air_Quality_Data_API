import parseRawData from '../utils/dataParser.js'
import dataService from './dataService.js'

let buffer = []

const addDataToBuffer = (data) => {
    const parsedData = parseRawData(data)

    try {
        if (!parsedData.length) {
            throw new Error('Invalid data format')
        }

        parsedData.forEach(registry => {
            buffer.push(registry)
        })
       
    } catch (error) {
        throw error
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
