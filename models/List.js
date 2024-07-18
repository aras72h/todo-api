const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed
const User = require('./User'); // Adjust path as needed

const List = sequelize.define('List', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'lists',
    timestamps: false,
    underscored: true,
});

List.belongsTo(User, { foreignKey: 'user_id' });

module.exports = List;
