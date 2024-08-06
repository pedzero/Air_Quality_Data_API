import Sequelize from 'sequelize'
import database from '../config/database.js'

const Parameter = database.define('parameter', {
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
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false
    },
    room_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'rooms',
            key: 'id'
        }
    }
})

export default Parameter