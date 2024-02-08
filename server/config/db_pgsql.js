const { Sequelize } = require('sequelize');

require('dotenv').config()

//Passing parameters separately
const db = new Sequelize(process.env.SQL_NAME, process.env.SQL_USER, process.env.SQL_PASSWORD.toString(), {
    host: process.env.SQL_HOST,
    dialect: 'postgres',
    logging:false
  });

const connectSQL = async () => {
    try {        
        await db.authenticate();
        console.log('PostgreSQL database connected...');

        console.log('add models to db');
        db.users = require('../models/users.model')
        db.cars = require('../models/cars.model')
        db.pruebas = require('../models/pruebas.model')
        db.participations = require('../models/participations.model')

        console.log('models sync');
        // await db.sync({alter:true})
        await db.sync()
        
        console.log('db ready');

    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};

module.exports = {
    connectSQL,
    db
}

