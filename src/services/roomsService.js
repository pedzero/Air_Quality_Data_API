import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import { NotFoundError } from '../errors/CustomErrors.js'

const retrieveAll = async (cityName, instituteName) => {
    const city = await CityRepository.findByName(cityName)
    if (!city) {
        throw new NotFoundError(`City '${cityName}' not found.`)
    }

    const institute = await InstituteRepository.findByCityIdAndName(city.id, instituteName)
    if (!institute) {
        throw new NotFoundError(`Institute '${instituteName}' not found in '${cityName}'.`)
    }

    const rooms = await RoomRepository.findAllByInstituteId(institute.id)

    return rooms
}

export default {
    retrieveAll
}
