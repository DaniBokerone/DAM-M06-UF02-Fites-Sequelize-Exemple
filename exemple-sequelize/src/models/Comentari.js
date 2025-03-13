const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comentari = sequelize.define('Comentari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcio: {
        type: DataTypes.TEXT
    },
    usuari_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuaris_youtuber',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'videos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'comentaris'
});

module.exports = Comentari;