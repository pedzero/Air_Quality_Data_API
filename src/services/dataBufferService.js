import parseRawData from '../utils/dataParser.js'
import dataService from './dataService.js'

let buffer = []

const addDataToBuffer = (data) => {
    const parsedData = parseRawData(data)
    for (const registry in parsedData) {
        buffer.push(parsedData[registry])
    }
}

// 30s interval for storing data into database
setInterval(() => {
    console.log('Storing buffer content in database...')
    dataService.store(buffer)
    .then(() => {
        buffer = [];
    })
}, 30000)

export default { addDataToBuffer }
