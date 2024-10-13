import City from '../models/City.js'

class CityRepository {
    async findOrCreate(name) {
        return await City.findOrCreate({
            where: { name: name },
            defaults: { name: name }
        })
    }
    
    async findByName(name) {
        return await City.findOne({
            where: { name: name }
        })
    }

    async findAll() {
        return await City.findAll({
            attributes: ['id', 'name']
        })
    }
}

export default new CityRepository()
