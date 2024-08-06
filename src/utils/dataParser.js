function parseRawData(data) {
    const parsedData = []

    for (const key in data) {
        const [institute, room, parameter] = key.split(/[-_]/)

        let values = data[key]

        if (!Array.isArray(values)) {
            values = [values]
        }

        values.forEach(valueTimestamp => {
            const [value, timestamp] = valueTimestamp.split('@')

            parsedData.push({
                institute: institute.trim(),
                room: room.trim(),
                parameter: parameter.trim(),
                value: parseFloat(value),
                timestamp: new Date(timestamp)
            })
        })
    }

    return parsedData
}

export default parseRawData