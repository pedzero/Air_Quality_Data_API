import CityRepository from '../repositories/CityRepository.js'
import validateId from '../utils/validateId.js'

const retrieve = async (filters) => {
    const { name, id } = filters

    if (id) {
        const validId = validateId(id)
        return CityRepository.findById(validId)
    }

    if (name?.trim()) {
        return CityRepository.findOneByName(name)
    }

    return CityRepository.findAll()
}

export default {
    retrieve,
}
