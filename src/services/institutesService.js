import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import { NotFoundError, ValidationError } from '../errors/CustomErrors.js'
import validateId from '../utils/validateId.js'

const retrieve = async (filters) => {
    const { city, name, cityId, id } = filters

    if (id) {
        const validId = validateId(id, 'Institute ID')
        const institute = await InstituteRepository.findById(validId)
        if (!institute) {
            throw new NotFoundError(`Institute with ID '${id}' not found.`)
        }
        return institute
    }

    const cityIdAsInt = cityId ? validateId(cityId, 'City ID') : null

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

    const cityQuery = await CityRepository.findOneByName(city.trim())
    if (!cityQuery) {
        throw new NotFoundError(`City '${city}' not found.`)
    }

    if (!name?.trim()) {
        return await InstituteRepository.findAllByCityId(cityQuery.id)
    }
    return await InstituteRepository.findOneByCityIdAndName(cityQuery.id, name.trim())
}

const destroy = async (filters) => {
    const { id } = filters

    const validId = validateId(id)
    const result = await InstituteRepository.destroy(validId)
    if (result) {
        return `Institute '${id}' deleted successfully.`
    }
    return `Institute '${id}' deletion failed. The ID may not exist.`
}

export default {
    retrieve,
    destroy,
}
