import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import { NotFoundError, ValidationError } from '../errors/CustomErrors.js'

const retrieve = async (filters) => {
    const { city, institute, name, instituteId } = filters

    if (!city?.trim() && !institute?.trim() && !name?.trim() && !instituteId?.trim()) {
        return await RoomRepository.findAll()
    }

    if (!city?.trim() && !institute?.trim()) {
        const instituteIdAsInt = parseInt(instituteId, 10)
        if (!instituteIdAsInt || instituteIdAsInt < 1) {
            throw new ValidationError(`Unable to parse InstituteId`)
        }

        if (!name?.trim()) {
            return await RoomRepository.findAllByInstituteId(instituteIdAsInt)
        }
        return await RoomRepository.findOneByInstituteIdAndName(instituteIdAsInt, name.trim())
    }

    if (!city?.trim() || !institute?.trim() || !name?.trim()) {
        throw new ValidationError("Unable to produce a search with the given parameters.")
    }

    const city_query = await CityRepository.findOneByName(city.trim())
    if (!city) {
        throw new NotFoundError(`City '${city.trim()}' not found.`)
    }

    const institute_query = await InstituteRepository.findOneByCityIdAndName(city_query.id, institute.trim())
    if (!institute) {
        throw new NotFoundError(`Institute '${institute.trim()}' not found in '${city.trim()}'.`)
    }

    return await RoomRepository.findAllByInstituteId(institute_query.id)
}

export default {
    retrieve
}
