const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UsuariYoutube = sequelize.define('UsuariYoutube', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    data_registre: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idioma: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuaris_youtuber'
});

module.exports = UsuariYoutube;