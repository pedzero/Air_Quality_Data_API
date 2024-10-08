import CityRepository from '../repositories/CityRepository.js'
import InstituteRepository from '../repositories/InstituteRepository.js'
import RoomRepository from '../repositories/RoomRepository.js'
import ParameterRepository from '../repositories/ParameterRepository.js'
import subtractHours from '../utils/subtractHours.js'

// name, interval, thresholds (ug/m3)
const parametersConfig = [
    { name: 'PM10', hoursInterval: 24, thresholds: [50, 100, 150, 250] },
    { name: 'PM2.5', hoursInterval: 24, thresholds: [25, 50, 75, 125] },
    { name: 'SO2', hoursInterval: 24, thresholds: [20, 40, 365, 800] },
    { name: 'NO2', hoursInterval: 1, thresholds: [200, 240, 320, 1130] },
    { name: 'O3', hoursInterval: 8, thresholds: [100, 130, 160, 200] },
    { name: 'CO', hoursInterval: 8, thresholds: [10000, 13000, 15000, 17000] },
]

const calculateIAQ = async (cityName, instituteName, roomName) => {
    const city = await CityRepository.findByName(cityName)
    if (!city) {
        throw new Error(`City '${cityName}' not found.`)
    }

    const institute = await InstituteRepository.findByCityIdAndName(city.id, instituteName)
    if (!institute) {
        throw new Error(`Institute '${instituteName}' not found in '${cityName}'.`)
    }

    const room = await RoomRepository.findByInstituteIdAndName(institute.id, roomName)
    if (!room) {
        throw new Error(`Room '${roomName}' not found in '${instituteName}'.`)
    }

    const dateNow = new Date(Date.now())

    const aqiData = await Promise.all(parametersConfig.map(async (paramConfig) => {
        const startTime = subtractHours(dateNow, paramConfig.hoursInterval)
        const query = await ParameterRepository.getAverageValueByRoom(paramConfig.name, room.id, startTime, dateNow, true)

        if (!query.name) {
            return null
        }
        
        const dataValues = query.dataValues

        const aqi = airQualityIndex(dataValues.averageValue, paramConfig.thresholds)
        return {
            parameter: paramConfig.name,
            value: dataValues.averageValue,
            aqi: aqi,
            timestamp: dateNow
        }
    }))

    const filteredData = aqiData.filter(data => data !== null);
    const overall = calculateOverall(filteredData);

    return {
        overall: overall,
        parameters: filteredData
    };
}

const airQualityIndex = (value, thresholds) => {
    let index = getAQIIndex(value, thresholds)
    return mapAQIToCategory(index)
}

const getAQIIndex = (value, thresholds) => {
    for (let i = 0; i < thresholds.length; i++) {
        if (value <= thresholds[i]) {
            return i + 1
        }
    }
    return thresholds.length + 1
}

const mapAQIToCategory = (index) => {
    switch (index) {
        case 0:
            return { index: index, category: "Unknown" }
        case 1:
            return { index: index, category: "Good" }
        case 2:
            return { index: index, category: "Moderate" }
        case 3:
            return { index: index, category: "Poor" }
        case 4:
            return { index: index, category: "Very Poor" }
        case 5:
            return { index: index, category: "Severe" }
        default:
            return { index: index, category: "Unknown" }
    }
}

const calculateOverall = (aqiData) => {
    let worstIndex = 0;
    let worstCategory = "Unknown";

    aqiData.forEach((data) => {
        if (data.aqi.index > worstIndex) {
            worstIndex = data.aqi.index;
            worstCategory = data.aqi.category;
        }
    });

    return {
        index: worstIndex,
        category: worstCategory
    };
}

export default {
    calculateIAQ
}
