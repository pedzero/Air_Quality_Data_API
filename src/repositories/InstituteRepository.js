import Institute from '../models/Institute.js'

class InstituteRepository {
    async findOrCreate(name, cityId) {
        return await Institute.findOrCreate({
            where: {
                name: name,
                city_id: cityId
            },
            defaults: {
                name: name,
                city_id: cityId
            }
        })
    }
    
    async findAll() {
        return await Institute.findAll({
            attributes: ['id', 'name', 'city_id']
        })
    }

    async findAllByCityId(cityId) {
        return await Institute.findAll({
            attributes: ['id', 'name', 'city_id'],
            where: {
                city_id: cityId
            }
        })
    }

    async findOneByCityIdAndName(cityId, name) {
        return await Institute.findOne({
            attributes: ['id', 'name', 'city_id'],
            where: {
                city_id: cityId,
                name: name
            }
        })
    }
}

export default new InstituteRepository()
