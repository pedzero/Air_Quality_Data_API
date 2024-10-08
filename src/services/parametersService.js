import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import ParameterRepository from '../repositories/ParameterRepository.js'

const retrieve = async (cityName, instituteName, roomName, parameterName, limit) => {
    const city = await CityRepository.findByName(cityName)
    if (!city) {
        throw new Error(`City '${cityName}' not found.`)
    }

    const institute = await InstituteRepository.findByCityIdAndName(city.id, instituteName)
    if (!institute) {
        throw new Error(`Institute '${instituteName}' not found in '${cityName}'.`)
    }

    const room = await RoomRepository.findByInstituteIdAndName(institute.id, roomName)
    if (!room) {
        throw new Error(`Room '${roomName}' not found in '${instituteName}'.`)
    }

    const parameters = await ParameterRepository.getLastParameters(parameterName, room.id, limit)

    return parameters
}

export default {
    retrieve
}
