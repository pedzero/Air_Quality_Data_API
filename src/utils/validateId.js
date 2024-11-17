import { ValidationError } from '../errors/CustomErrors.js'

const validateId = (id, fieldName = 'ID') => {
    const idAsInt = parseInt(id, 10)
    if (isNaN(idAsInt) || idAsInt < 1) {
        throw new ValidationError(`Invalid ${fieldName}. Must be a positive integer greater than 0.`)
    }
    return idAsInt
}

export default validateId