// Requires the object that represents our database
const { db } = require('../config/db_pgsql');

const { DataTypes } = require('sequelize');

const usuario = db.define("usuario", {
    id_usuario: {
        field: 'id_usuario',
        type: DataTypes.UUID,
        primaryKey:true,
    },
    nombre: {
        field: 'nombre',
        type: DataTypes.STRING(50)
    },
    apellido:{
        field: 'apellido',
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
    
},
    {
        db,
        modelName: 'usuario',
        tableName: 'usuario',
        timestamps:false,
    }
);

// This syncs our model with our database.
// Users.sync({alter:true});
usuario.sync({alter:true});

module.exports = usuario;