import Parameter from '../models/Parameter.js'
import sequelize from '../config/database.js'
import { Op } from 'sequelize'

class ParameterRepository {
    async create(parameterData) {
        return await Parameter.create(parameterData)
    }

    async findByInstituteIdAndName(instituteId, name) {
        return await Parameter.findOne({
            where: {
                institute_id: instituteId,
                name: name
            }
        })
    }

    async getAverageValueByRoom(parameterName, roomId, startTime, endTime, aqiIncluded) {
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
