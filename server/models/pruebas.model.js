// Requires the object that represents our database
const { db } = require('../config/db_pgsql');

const { DataTypes } = require('sequelize');

const pruebas = db.define("pruebas", {
    uuid: {
        field: 'uuid',
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        field: 'name',
        type: DataTypes.STRING(50)
    },
    description: {
        field: 'description',
        type: DataTypes.STRING(200)
    },
},
    {
        db,
        modelName: 'pruebas',
        tableName: 'pruebas',
        timestamps: false,
    }
);

pruebas.removeAttribute('id')

module.exports = pruebas;
