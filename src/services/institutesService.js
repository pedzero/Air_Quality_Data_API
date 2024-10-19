import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import { NotFoundError, ValidationError } from '../errors/CustomErrors.js'

const retrieve = async (filters) => {
    const { city, name } = filters

    if (!city?.trim() && !name?.trim()) {
        return await InstituteRepository.findAll()
    }

    if (!city?.trim()) {
        throw new ValidationError("Unable to produce a search with the given parameters.")
    }

    const city_query = await CityRepository.findOneByName(city.trim())
    if (!city_query) {
        throw new NotFoundError(`City '${city}' not found.`)
    }

    if (!name?.trim()) {
        return await InstituteRepository.findAllByCityId(city_query.id)
    }

    return await InstituteRepository.findOneByCityIdAndName(city_query.id, name.trim())
}

export default {
    retrieve
}
