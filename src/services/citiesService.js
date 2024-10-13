import CityRepository from '../repositories/CityRepository.js'
import { NotFoundError } from '../errors/CustomErrors.js'

const retrieveAll = async () => {
    const cities = await CityRepository.findAll()

    return cities
}

export default {
    retrieveAll
}
