import Sequelize from 'sequelize'
import database from '../config/database.js'

const Room = database.define('room', {
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
    institute_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'institutes',
            key: 'id'
        },
        onDelete: 'CASCADE',
    }
})

export default Room