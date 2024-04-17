const { connectSQL} = require('../config/db_pgsql');
const usersModel = require('../models/users.model');
const carsModel = require('../models/cars.model');
const eventsModel = require('../models/events.model');
const participationsModel = require('../models/participations.model');

const clearDatabase = async () => {
    try {
        await connectSQL();
        
        await participationsModel.destroy({ where: {} });
        await eventsModel.destroy({ where: {} });
        await carsModel.destroy({ where: {} });
        await usersModel.destroy({ where: {} });
        
        console.log('Database cleared successfully');
    } catch (error) {
        console.error('Unable to clear the database:', error);
    }
}

console.log('Clearing database...');
clearDatabase();