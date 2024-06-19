const { Sequelize } = require('sequelize');

require('dotenv').config()

//Passing parameters separately
const db = new Sequelize(process.env.SQL_NAME, process.env.SQL_USER, process.env.SQL_PASSWORD.toString(), {
    host: process.env.SQL_HOST,
    dialect: 'postgres',
    logging:false
  });

const checkDatabaseContent = async () => {
    console.log('check database content');
    const users = await db.users.findAll()
    if(users.length == 0){
        console.log('no users found ,add default data');
        console.log('data clearing');
        res = require('../scripts/clearDatabase');
        console.log('data population');
        res = require('../scripts/populateDataBase');
    }else{  
        console.log('users found');
    }
    console.log('database content checked');
}

const connectSQL = async () => {
    try {        
        await db.authenticate();
        console.log('PostgreSQL database connected...');

        console.log('Sequiellize db models sincronization');

        console.log('add models to db');
        db.users = require('../models/users.model')
        db.cars = require('../models/cars.model')
        db.events = require('../models/events.model')
        db.participations = require('../models/participations.model')

        console.log('add relations to db');
        db.cars.hasOne(db.participations, {onDelete: 'CASCADE'})
        db.participations.belongsTo(db.cars)
        db.events.hasOne(db.participations, {onDelete: 'CASCADE'})
        db.participations.belongsTo(db.events)
        db.users.hasMany(db.cars , {onDelete: 'CASCADE'});
        db.cars.belongsTo(db.users );

        console.log('db sync');
        // await db.sync({alter:true})
        db.sync()
        
        console.log('db ready');

        checkDatabaseContent();

    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};

module.exports = {
    connectSQL,
    db
}

