// Requires the object that represents our database
const { db } = require('../config/db_pgsql');

const { DataTypes } = require('sequelize');

const events = db.define("events", {
    uuid: {
        field: 'uuid',
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        field: 'name',
        type: DataTypes.STRING(50),
        unique: true,
    },
    date: {
        field: 'date',
        type: DataTypes.DATEONLY
    },
    description: {
        field: 'description',
        type: DataTypes.STRING(200)
    },
},
    {
        db,
        modelName: 'events',
        tableName: 'events',
        timestamps: false,
    }
);

events.removeAttribute('id')

module.exports = events;
