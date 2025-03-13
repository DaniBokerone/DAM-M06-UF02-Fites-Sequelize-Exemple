const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VideoLikes = sequelize.define('VideoLikes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    },
    tipus: {
        type: DataTypes.ENUM('like', 'dislike'),
        allowNull: false
    }
}, {
    tableName: 'video_likes',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['usuari_id', 'video_id']
        }
    ]
});

module.exports = VideoLikes;
