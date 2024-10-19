import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import { NotFoundError } from '../errors/CustomErrors.js'

const retrieve = async (filters) => {
    const { city, name } = filters
    console.log(filters)

    if (!city?.trim() && !name?.trim()) {
        console.log("All")
        return await InstituteRepository.findAll()
    }

    let city_query = await CityRepository.findOneByName(city.trim())
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
