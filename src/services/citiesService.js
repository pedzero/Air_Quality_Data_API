import CityRepository from '../repositories/CityRepository.js'
import { NotFoundError } from '../errors/CustomErrors.js'
import validateId from '../utils/validateId.js'

const retrieve = async (filters) => {
    const { name, id } = filters

    if (id) {
        const validId = validateId(id)
        const city = await CityRepository.findById(validId)
        if (!city) {
            throw new NotFoundError(`City with ID '${id}' not found.`)
        }
        return city
    }

    if (name?.trim()) {
        return await CityRepository.findOneByName(name)
    }

    return await CityRepository.findAll()
}

export default {
    retrieve,
}
