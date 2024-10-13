import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import { NotFoundError } from '../errors/CustomErrors.js'

const retrieveAll = async (cityName, instituteName) => {
    const city = await CityRepository.findByName(cityName)
    if (!city) {
        throw new NotFoundError(`City '${cityName}' not found.`)
    }

    const institutes = await InstituteRepository.findAllByCityId(city.id)

    return institutes
}

export default {
    retrieveAll
}
