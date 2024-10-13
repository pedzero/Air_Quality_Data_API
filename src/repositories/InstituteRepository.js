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
    
    async findByCityIdAndName(cityId, name) {
        return await Institute.findOne({
            where: {
                city_id: cityId,
                name: name
            }
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
}

export default new InstituteRepository()
