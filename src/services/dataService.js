import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import ParameterRepository from '../repositories/ParameterRepository.js'

const store = async (buffer) => {
    for (const registry of buffer) {
        const [city] = await CityRepository.findOrCreate(registry.city)
        
        const [institute] = await InstituteRepository.findOrCreate(registry.institute, city.id)
        
        const [room] = await RoomRepository.findOrCreate(registry.room, institute.id)
        
        await ParameterRepository.create({
            name: registry.parameter,
            value: registry.value,
            aqi_included: registry.aqi_included,
            room_id: room.id,
            timestamp: registry.timestamp
        })
    }
}

export default { store }
