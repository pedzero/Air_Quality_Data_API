import Sequelize from 'sequelize'
import database from '../config/database.js'
 
const Institute = database.define('institute', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'cities',
            key: 'id'
        },
        onDelete: 'CASCADE',
    }
})
 
export default Institute