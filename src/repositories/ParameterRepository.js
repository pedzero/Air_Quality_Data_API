import Parameter from '../models/Parameter.js'
import sequelize from '../config/database.js'
import { Op } from 'sequelize'

class ParameterRepository {
    async create(parameterData) {
        return await Parameter.create(parameterData)
    }

    async findAllByRoomId(roomId) {
        return await Parameter.findAll({
            attributes: ['id', 'name', 'value', 'aqi_included', 'timestamp', 'room_id'],
            where: {
                room_id: roomId
            }
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
        const whereConditions = {
            name: parameterName,
            room_id: roomId,           
            timestamp: {
                [Op.between]: [startTime, endTime]
            }
        }

        if (aqiIncluded) {
            whereConditions.aqi_included = aqiIncluded
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
}

export default new ParameterRepository()
