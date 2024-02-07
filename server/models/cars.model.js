// Requires the object that represents our database
const { db } = require('../config/db_pgsql');

const { DataTypes } = require('sequelize');

const cars = db.define("cars", {
    uuid: {
        field: 'uuid',
        type: DataTypes.UUID,
        primaryKey: true,
    },
    brand: {
        field: 'brand',
        type: DataTypes.STRING(50)
    },
    model: {
        field: 'model',
        type: DataTypes.STRING(50)
    },
    body: {
        field: 'body',
        type: DataTypes.STRING(50)
    },
},
    {
        db,
        modelName: 'cars',
        tableName: 'cars',
        timestamps: false,
    }
);

cars.removeAttribute('id')

module.exports = cars;