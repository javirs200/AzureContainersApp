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
    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
};

module.exports = {
    connectSQL,
    db
}

