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
        db.events = require('../models/events.model')
        db.participations = require('../models/participations.model')

        console.log('add relations to db');
        db.cars.hasOne(db.participations)
        db.participations.belongsTo(db.cars)
        db.events.hasOne(db.participations)
        db.participations.belongsTo(db.events)
        db.users.hasMany(db.cars);
        db.cars.belongsTo(db.users);

        console.log('db sync');
        // await db.sync({alter:true})
        db.sync()
        
        console.log('db ready');

    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};

module.exports = {
    connectSQL,
    db
}

