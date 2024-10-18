import City from '../models/City.js'

class CityRepository {
    async findOrCreate(name) {
        return await City.findOrCreate({
            where: { name: name },
            defaults: { name: name }
        })
    }
    
    async findOneByName(name) {
        return await City.findOne({
            attributes: ['id', 'name'],
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
