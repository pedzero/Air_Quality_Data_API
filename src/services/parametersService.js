import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import ParameterRepository from '../repositories/ParameterRepository.js'
import { NotFoundError } from '../errors/CustomErrors.js'

const retrieve = async (cityName, instituteName, roomName, parameterName, limit) => {
    const city = await CityRepository.findByName(cityName)
    if (!city) {
        throw new NotFoundError(`City '${cityName}' not found.`)
    }

    const institute = await InstituteRepository.findByCityIdAndName(city.id, instituteName)
    if (!institute) {
        throw new NotFoundError(`Institute '${instituteName}' not found in '${cityName}'.`)
    }

    const room = await RoomRepository.findByInstituteIdAndName(institute.id, roomName)
    if (!room) {
        throw new NotFoundError(`Room '${roomName}' not found in '${instituteName}'.`)
    }

    let limitAsInt = parseInt(limit, 10)
    if (!limit?.trim() || limitAsInt <= 0) {
        limitAsInt = 1
    }

    const parameters = await ParameterRepository.getLastParameters(parameterName, room.id, limitAsInt)

    return parameters
}

export default {
    retrieve
}
