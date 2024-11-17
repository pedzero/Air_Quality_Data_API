import CityRepository from '../repositories/CityRepository.js'
import { ValidationError } from '../errors/CustomErrors.js'

const validateId = (id) => {
    const idAsInt = parseInt(id, 10)
    if (isNaN(idAsInt) || idAsInt < 1) {
        throw new ValidationError('Invalid ID. ID must be a positive integer greater than 0.')
    }
    return idAsInt
}

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
