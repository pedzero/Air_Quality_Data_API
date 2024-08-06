function parseRawData(data) {
    const parsedData = []

    for (const key in data) {
        const [institute, room, parameter] = key.split(/[-_]/)

        if (!institute || !room || !parameter) {
            throw new Error(`Invalid key format: ${key}`)
        }

        let values = data[key]

        if (!Array.isArray(values)) {
            values = [values]
        }

        values.forEach(valueTimestamp => {
            const [value, timestamp] = valueTimestamp.split('@')

            if (value === undefined || timestamp === undefined) {
                throw new Error(`Invalid value or timestamp in key: ${key}`)
            }

            const parsedValue = parseFloat(value)
            const parsedTimestamp = new Date(timestamp)

            if (isNaN(parsedValue) || isNaN(parsedTimestamp.getTime())) {
                throw new Error(`Invalid value or timestamp format in key: ${key}`)
            }

            parsedData.push({
                institute: institute.trim(),
                room: room.trim(),
                parameter: parameter.trim(),
                value: parsedValue,
                timestamp: parsedTimestamp
            })
        })
    }

    return parsedData
}

export default parseRawData