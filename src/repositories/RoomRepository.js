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
    
    async findByInstituteIdAndName(instituteId, name) {
        return await Room.findOne({
            where: {
                institute_id: instituteId,
                name: name
            }
        })
    }
}

export default new RoomRepository()
