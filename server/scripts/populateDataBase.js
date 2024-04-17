const { connectSQL,db } = require('../config/db_pgsql');
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid');
const usersModel = require('../models/users.model');
const carsModel = require('../models/cars.model');
const eventsModel = require('../models/events.model');
const participationsModel = require('../models/participations.model');


const populateDatabase = async () => {
    try {
        await connectSQL();

        await createUser('admin', 'admin@admin.com', 'admin1234', 'admin');
        await createUser('anonimo', 'anonimo@anonimo.com', '1234', 'driver');
        await createUser('user1', 'a@a.com', '4321', 'driver');

        await createCar('a@a.com', 'brand1', 'model1', 'body1');
        await createCar('a@a.com', 'brand2', 'model2', 'body2');
        await createCar('a@a.com', 'brand3', 'model3', 'body3');
        await createCar('anonimo@anonimo.com', 'hps', 'ff', 'nisssanGTR');
        await createCar('anonimo@anonimo.com', 'tamiya', 'tt02', 'AudiA3');

        await createEvent('gp España', 'carrera de coches sedan', '2021-12-12');
        await createEvent('gp Italia', 'carrera de audi ', '2021-12-11');

        await createParticipation('anonimo@anonimo.com', 'AudiA3', 'gp España');
        await createParticipation('a@a.com', 'body1', 'gp España');
        await createParticipation('a@a.com', 'body1', 'gp Italia');

        console.log('Database populated successfully');
    } catch (error) {
        console.error('Unable to populate the database:', error);
    }
};

const createUser = async (name, email, password, rol) => {

    if (rol == null) {
        //default role unprivileged user
        rol = 'driver';
    }

    password = await bcrypt.hash(password, 10)

    const uuid = uuidV4.v4()

    const data = { uuid, name, email, password, rol }

    // console.log('datos para guardar en dB ', data);
    const answer = await usersModel.create(data);
}

const createCar = async (email, carBrand, carModel, carBody) => {
    let user = await usersModel.findOne({ where: { email: email } });
    if (user) {
        const userUuid = user.uuid
        const uuid = uuidV4.v4()
        const data = { uuid, brand: carBrand, model: carModel, body: carBody, userUuid }
        let car = await carsModel.create(data);
    }
}

const createEvent = async (name, description, date) => {
    const uuid = uuidV4.v4()

    const data = { uuid, name, description, date }

    const answer = await eventsModel.create(data);
}

const createParticipation = async (email, carBody, eventName) => {
    let event = await eventsModel.findOne({ where: { name: eventName } });
    if (event) {
        let userCarData = await usersModel.findOne({
            where: { email: email },
            include: 
            [
                {
                    model: carsModel,
                    where: { body: carBody }
                }
            ]
        });
        if (userCarData) {
            const carUuid = userCarData.cars[0].uuid
            const eventUuid = event.uuid
            const uuid = uuidV4.v4()
            const data = { uuid, eventUuid, carUuid }
            const participation = await participationsModel.create(data)
        }
    }
}

console.log('populating database...');
populateDatabase();