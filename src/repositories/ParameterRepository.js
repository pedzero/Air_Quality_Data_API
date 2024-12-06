import Parameter from '../models/Parameter.js'
import sequelize from '../config/database.js'
import { col, fn, literal, Op } from 'sequelize'

class ParameterRepository {
    async create(parameterData) {
        return await Parameter.create(parameterData)
    }

    async findAllDistinctNamesByRoomId(roomId) {
        return await Parameter.findAll({
            attributes: ['name', 'aqi_included'],
            where: {
                room_id: roomId
            },
            group: ['name', 'aqi_included'],
        })
    }


    async findOneByRoomIdAndName(roomId, name) {
        return await Parameter.findOne({
            attributes: ['id', 'name', 'value', 'aqi_included', 'timestamp', 'room_id'],
            where: {
                room_id: roomId,
                name: name
            }
        })
    }

    async findNByRoomIdAndName(roomId, name, limit) {
        return await Parameter.findAll({
            attributes: ['id', 'name', 'value', 'aqi_included', 'timestamp', 'room_id'],
            where: {
                room_id: roomId,
                name: name
            },
            order: [['timestamp', 'DESC']],
            limit: limit
        })
    }

    async getAverageValueByRoomIdAndName(roomId, parameterName, startTime, endTime, aqiIncluded) {
        const aqiIncludedBoolean = aqiIncluded === 'true';
        const whereConditions = {
            name: parameterName,
            room_id: roomId,
            timestamp: {
                [Op.between]: [startTime, endTime]
            }
        }

        if (aqiIncluded) {
            whereConditions.aqi_included = aqiIncludedBoolean
        }

        const result = await Parameter.findOne({
            attributes: [
                'name',
                [sequelize.fn('AVG', sequelize.col('value')), 'averageValue']
            ],
            where: whereConditions
        })

        return result
    }

    async findAggregatedByRoomAndParameter(roomId, parameter, aqiIncluded, startDate, endDate, intervalSeconds) {
        if (!roomId || !parameter || !aqiIncluded || !startDate || !endDate || !intervalSeconds) {
            throw new Error("Missing required parameters for aggregated query")
        }
        const aqiIncludedBoolean = aqiIncluded === 'true';
        const results = await Parameter.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'DATE_ADD',
                        sequelize.literal('FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(timestamp) / :intervalSeconds) * :intervalSeconds)'),
                        sequelize.literal('INTERVAL 0 SECOND')
                    ),
                    'bucket_start',
                ],
                [sequelize.fn('AVG', sequelize.col('value')), 'average_value'],
                [sequelize.fn('MAX', sequelize.col('value')), 'max_value'],
                [sequelize.fn('MIN', sequelize.col('value')), 'min_value'],
            ],
            where: {
                room_id: roomId,
                name: parameter,
                timestamp: {
                    [Op.between]: [startDate, endDate],
                },
                aqi_included: aqiIncludedBoolean
            },
            replacements: { intervalSeconds },
            group: ['bucket_start'],
            order: [[sequelize.literal('bucket_start'), 'ASC']],
        })
        
        return results
    }  
}

export default new ParameterRepository()
