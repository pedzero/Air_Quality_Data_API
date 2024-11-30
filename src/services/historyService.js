import RoomRepository from "../repositories/RoomRepository.js"
import ParameterRepository from "../repositories/ParameterRepository.js"
import { ValidationError, NotFoundError } from "../errors/CustomErrors.js"

const historyService = {}

historyService.getHistoricalData = async (filters) => {
    const { roomId, parameter, aqiIncluded, start, end, precision } = filters
    if (!roomId || isNaN(parseInt(roomId, 10))) {
        throw new ValidationError("Invalid or missing 'roomId'.")
    }
    if (!parameter?.trim()) {
        throw new ValidationError("Invalid or missing 'parameter'.")
    }
    if (!aqiIncluded?.trim()) {
        throw new ValidationError("Invalid or missing 'aqiIncluded'.")
    }
    if (!start || isNaN(Date.parse(start))) {
        throw new ValidationError("Invalid or missing 'start' timestamp.")
    }
    if (!end || isNaN(Date.parse(end))) {
        throw new ValidationError("Invalid or missing 'end' timestamp.")
    }
    if (!precision || isNaN(parseInt(precision, 10)) || parseInt(precision, 10) <= 0) {
        throw new ValidationError("Invalid 'precision' value. It must be a positive integer.")
    }

    const room = await RoomRepository.findById(roomId)
    if (!room) {
        throw new NotFoundError(`Room with ID '${roomId}' not found.`)
    }

    const startDate = new Date(start)
    const endDate = new Date(end)
    const precisionInt = parseInt(precision, 10)
    const intervalSeconds = Math.floor((endDate - startDate) / (precisionInt * 1000))

    if (intervalSeconds <= 0) {
        throw new ValidationError("Invalid range or precision. Ensure the range is large enough.")
    }

    const historicalData = await ParameterRepository.findAggregatedByRoomAndParameter(
        roomId,
        parameter.trim(),
        aqiIncluded,
        startDate,
        endDate,
        intervalSeconds,
    )

    const aggregatedResults = []
    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000)

    for (let i = 0; i < precision; i++) {
        const bucketStart = startTimestamp + i * intervalSeconds
        const bucketEnd = bucketStart + intervalSeconds

        const existingBucket = historicalData.find(result => {
            const bucketTime = Math.floor(
                new Date(result.dataValues.bucket_start).getTime() / 1000
            )
            return bucketTime >= bucketStart && bucketTime < bucketEnd
        })

        aggregatedResults.push(
            existingBucket || {
                bucket_start: new Date(bucketStart * 1000).toISOString(),
                average_value: null,
                max_value: null,
                min_value: null,
            }
        )
    }

    return aggregatedResults
}

export default historyService
