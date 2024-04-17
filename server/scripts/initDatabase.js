const { connectSQL} = require('../config/db_pgsql');

const initDatabase = async () => {
    try {
        await connectSQL();
        
        console.log('Database init successfully');
    } catch (error) {
        console.error('Unable to init the database:', error);
    }
}

console.log('initializing database...');
initDatabase();