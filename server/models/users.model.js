// Requires the object that represents our database
const { db } = require('../config/db_pgsql');

const { DataTypes } = require('sequelize');

const users = db.define("users", {
    uuid: {
        field: 'uuid',
        type: DataTypes.UUID,
        primaryKey:true,
    },
    name: {
        field: 'name',
        type: DataTypes.STRING(50)
    },
    email: {
        field: 'email',
        unique: 'true',
        type: DataTypes.STRING(50),
    },
    password:{
        field: 'password',
        type: DataTypes.STRING()
    },
    rol: {
        field: 'rol',
        type: DataTypes.STRING(50)
    },
    myCars:{
        field:'myCars',
        type: DataTypes.UUID,
    }    
},
    {
        db,
        modelName: 'users',
        tableName: 'users',
        timestamps:false,
    }
);

const cars = require('./cars.model')


users.hasMany(cars,{foreignKey:'myCars'});
cars.belongsTo(users);


users.removeAttribute('id')

module.exports = users;