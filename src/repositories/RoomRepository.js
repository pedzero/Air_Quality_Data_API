import Room from '../models/Room.js'

class RoomRepository {
    async findOrCreate(name, instituteId) {
        return await Room.findOrCreate({
            where: {
                name,
                institute_id: instituteId
            },
            defaults: {
                name,
                institute_id: instituteId
            }
        })
    }

    async findAll() {
        return await Room.findAll({
            attributes: ['id', 'name', 'institute_id']
        })
    }

    async findById(id) {
        return await Room.findOne({
            attributes: ['id', 'name', 'institute_id'],
            where: {
                id: id
            }
        })
    }
    
    async findOneByInstituteIdAndName(instituteId, name) {
        return await Room.findOne({
            attributes: ['id', 'name', 'institute_id'],
            where: {
                institute_id: instituteId,
                name: name
            }
        })
    }

    async findAllByInstituteId(instituteId) {
        return await Room.findAll({
            attributes: ['id', 'name', 'institute_id'],
            where: {
                institute_id: instituteId
            }
        })
    }

    async destroy(id) {
        return await Room.destroy({
            where: { id: id }
        })
    }
}

export default new RoomRepository()