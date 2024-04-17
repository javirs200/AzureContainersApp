// Requires the object that represents our database
const { db } = require('../config/db_pgsql');

const { DataTypes } = require('sequelize');

const participations = db.define("participations", {
    t1: {
        field: 't1',
        type: DataTypes.TIME
    },
    t2: {
        field: 't2',
        type: DataTypes.TIME
    },
    t3: {
        field: 't3',
        type: DataTypes.TIME
    },
    t4: {
        field: 't4',
        type: DataTypes.TIME
    },
    t5: {
        field: 't5',
        type: DataTypes.TIME
    },
    t6: {
        field: 't6',
        type: DataTypes.TIME
    },
},
    {
        db,
        modelName: 'participations',
        tableName: 'participations',
        timestamps: false,
    }
);

participations.removeAttribute('id')

module.exports = participations;
