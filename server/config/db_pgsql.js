const { Sequelize } = require('sequelize');

require('dotenv').config()
//?sslmode=require
const dbURI = `postgres://${process.env.SQL_USER}:${process.env.SQL_PASSWORD}@${process.env.SQL_HOST}/${process.env.SQL_NAME}`

console.log('uri de la database',dbURI);

const db = new Sequelize(dbURI, {logging:false});

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

