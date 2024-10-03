import City from '../models/City.js'
import Institute from '../models/Institute.js'
import Room from '../models/Room.js'
import Parameter from '../models/Parameter.js'

const store = async (buffer) => {
    for (const registry of buffer) {
        const [city] = await City.findOrCreate({
            where: { name: registry.city },
            defaults: { name: registry.city }
        })

        const [institute] = await Institute.findOrCreate({
            where: { name: registry.institute, city_id: city.id },
            defaults: { name: registry.institute, city_id: city.id }
        })

        const [room] = await Room.findOrCreate({
            where: { name: registry.room, institute_id: institute.id },
            defaults: { name: registry.room, institute_id: institute.id }
        })

        await Parameter.create({
            name: registry.parameter,
            value: registry.value,
            room_id: room.id,
            timestamp: registry.timestamp
        })
    }
}

export default { store }
