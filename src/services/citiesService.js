import CityRepository from '../repositories/CityRepository.js'

const retrieve = async (filters) => {
    const { name } = filters

    if (!name?.trim()) {
        const cities = await CityRepository.findAll()
        return cities
    } 

    const city = await CityRepository.findOneByName(name)
    return city
}

export default {
    retrieve
}
