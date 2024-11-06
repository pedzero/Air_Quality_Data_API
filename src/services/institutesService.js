import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import { NotFoundError, ValidationError } from '../errors/CustomErrors.js'

const retrieve = async (filters) => {
    const { city, name, cityId } = filters

    const cityIdAsInt = parseInt(cityId, 10)
    if (cityId && (!cityIdAsInt || cityIdAsInt < 1)) {
        throw new ValidationError('Unable to parse cityId.')
    }

    if (!cityIdAsInt && !city?.trim() && !name?.trim()) {
        return await InstituteRepository.findAll()
    }

    if (cityIdAsInt) {
        if (!name?.trim()) {
            return await InstituteRepository.findAllByCityId(cityIdAsInt)
        }
        return await InstituteRepository.findOneByCityIdAndName(cityIdAsInt, name.trim())
    }

    if (!city?.trim()) {
        throw new ValidationError('Unable to produce a search with the given parameters.')
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
