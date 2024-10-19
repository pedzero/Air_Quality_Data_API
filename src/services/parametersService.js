import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import ParameterRepository from '../repositories/ParameterRepository.js'
import { NotFoundError } from '../errors/CustomErrors.js'

const retrieve = async (filters) => {
    const { city, institute, room, roomId, name, limit } = filters
    
    let limitAsInt = parseInt(limit, 10)
    if (!limitAsInt || limitAsInt <= 0) {
        limitAsInt = 1
    }

    if (!city?.trim() && !institute?.trim() && !room?.trim()) {
        const roomIdAsInt = parseInt(roomId, 10)
        if (!roomIdAsInt || roomIdAsInt < 1) {
            throw new ValidationError(`Unable to parse RoomId`)
        }
        if (!name?.trim()) {
            return await ParameterRepository.findAllByRoomId(roomIdAsInt)
        }
        return await ParameterRepository.findNByRoomIdAndName(roomIdAsInt, name.trim(), limitAsInt)
        
    }

    if (!city?.trim() || !institute?.trim() || !room?.trim() || !name?.trim()) {
        throw new ValidationError("Unable to produce a search with the given parameters.")
    }

    const city_query = await CityRepository.findOneByName(city)
    if (!city_query) {
        throw new NotFoundError(`City '${city.trim()}' not found.`)
    }

    const institute_query = await InstituteRepository.findOneByCityIdAndName(city_query.id, institute.trim())
    if (!institute_query) {
        throw new NotFoundError(`Institute '${institute.trim()}' not found in '${city.trim()}'.`)
    }

    const room_query = await RoomRepository.findOneByInstituteIdAndName(institute_query.id, room.trim())
    if (!room_query) {
        throw new NotFoundError(`Room '${room.trim()}' not found in '${institute.trim()}'.`)
    }

    return await ParameterRepository.findNByRoomIdAndName(room_query.id, name.trim(), limitAsInt)
}

export default {
    retrieve
}
