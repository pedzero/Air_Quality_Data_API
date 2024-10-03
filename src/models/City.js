import Sequelize from 'sequelize'
import database from '../config/database.js'
 
const City = database.define('city', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
 
export default City