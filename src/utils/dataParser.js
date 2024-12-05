import { ValidationError } from '../errors/CustomErrors.js'

function parseRawData(data) {
    const parsedData = []

    for (const key in data) {
        const [city, institute, room, rawParameter] = key.split(/[_]/)

        if (!city || !institute || !room || !rawParameter) {
            throw new ValidationError(`Invalid key format: ${key}`)
        }

        let aqi_included = false
        let parameter = rawParameter

        if (parameter.includes('*')) {
            aqi_included = true
            parameter = parameter.replace('*', '')
        }

        let values = data[key]

        if (!Array.isArray(values)) {
            values = [values]
        }

        values.forEach(valueTimestamp => {
            const [value, timestamp] = valueTimestamp.split('@')

            if (value === undefined || timestamp === undefined) {
                throw new ValidationError(`Invalid value or timestamp in key: ${key}`)
            }

            const parsedValue = parseFloat(value)
            const parsedTimestamp = new Date(timestamp)

            if (isNaN(parsedValue) || isNaN(parsedTimestamp.getTime())) {
                throw new ValidationError(`Invalid value or timestamp format in key: ${key}`)
            }

            parsedData.push({
                city: city.trim(),
                institute: institute.trim(),
                room: room.trim(),
                parameter: parameter.trim(),
                value: parsedValue,
                aqi_included: aqi_included,
                timestamp: parsedTimestamp
            })
        })
    }

    if (parsedData.length === 0) {
        throw new ValidationError('No valid data found after parsing.')
    }

    return parsedData
}

export default parseRawData
