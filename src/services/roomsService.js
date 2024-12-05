import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import { NotFoundError, ValidationError } from '../errors/CustomErrors.js'
import validateId from '../utils/validateId.js'

const retrieve = async (filters) => {
    const { city, institute, name, instituteId, id } = filters

    if (id) {
        const validId = validateId(id, 'Room ID')
        const room = await RoomRepository.findById(validId)
        if (!room) {
            throw new NotFoundError(`Room with ID '${id}' not found.`)
        }
        return room
    }

    if (!city?.trim() && !institute?.trim() && !name?.trim() && !instituteId?.trim()) {
        return await RoomRepository.findAll()
    }

    if (instituteId?.trim() && !city?.trim() && !institute?.trim()) {
        const validInstituteId = validateId(instituteId, 'Institute ID')
        if (!name?.trim()) {
            return await RoomRepository.findAllByInstituteId(validInstituteId)
        }
        return await RoomRepository.findOneByInstituteIdAndName(validInstituteId, name.trim())
    }

    if (city?.trim() && institute?.trim()) {
        const cityQuery = await CityRepository.findOneByName(city.trim())
        if (!cityQuery) {
            throw new NotFoundError(`City '${city.trim()}' not found.`)
        }

        const instituteQuery = await InstituteRepository.findOneByCityIdAndName(cityQuery.id, institute.trim())
        if (!instituteQuery) {
            throw new NotFoundError(`Institute '${institute.trim()}' not found in '${city.trim()}'.`)
        }

        if (!name?.trim()) {
            return await RoomRepository.findAllByInstituteId(instituteQuery.id)
        }
        return await RoomRepository.findOneByInstituteIdAndName(instituteQuery.id, name.trim())
    }

    throw new ValidationError('Unable to produce a search with the given parameters.')
}

const destroy = async (filters) => {
    const { id } = filters

    const validId = validateId(id)
    const result = await RoomRepository.destroy(validId)
    if (result) {
        return `Room '${id}' deleted successfully.`
    }
    return `Room '${id}' deletion failed. The ID may not exist.`
}

export default {
    retrieve,
    destroy,
}
