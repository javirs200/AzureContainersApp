// Desc: Script to populate the database with some data for testing purposes
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid');
const usersModel = require('../models/users.model');
const carsModel = require('../models/cars.model');
const eventsModel = require('../models/events.model');
const participationsModel = require('../models/participations.model');


const populateDatabase = async () => {
    try {

        await createUser('admin', 'admin@admin.com', 'admin1234', 'admin');
        await createUser('anonimo', 'anonimo@anonimo.com', '1234', 'driver');
        await createUser('user1', 'a@a.com', '4321', 'driver');

        await createCar('a@a.com', 'tamiya', 'xv01', 'ToyotaST185');
        await createCar('a@a.com', 'tamiya', 'xv02', 'MaseratiQuattroporte');
        await createCar('a@a.com', 'tamiya', 'tt02', 'MazdaMX5');

        await createCar('admin@admin.com', 'hsp', 'ff', 'AudiA4');
        await createCar('admin@admin.com', 'tamiya', 'tt02', 'BmwM3');

        await createCar('anonimo@anonimo.com', 'hsp', 'ff', 'NisssanGTR');
        await createCar('anonimo@anonimo.com', 'tamiya', 'tt02', 'AudiA3');

        await createEvent('gp España', 'carrera de coches sedan', '2021-12-12');
        await createEvent('gp Italia', 'carrera de audi ', '2021-12-11');

        await createParticipation('anonimo@anonimo.com', 'AudiA3', 'gp España');
        await createParticipation('a@a.com', 'ToyotaST185', 'gp España');

        await createParticipation('a@a.com', 'MaseratiQuattroporte', 'gp Italia');

        await createTime('ToyotaST185', 'gp España', 1, 2, 1);
        await createTime('ToyotaST185', 'gp España', 1, 2, 2);
        await createTime('ToyotaST185', 'gp España', 2, 2, 3);

        await createTime('AudiA3', 'gp España', 1, 2, 1);
        await createTime('AudiA3', 'gp España', 2, 2, 2);
        await createTime('AudiA3', 'gp España', 1, 2, 3);

        await createTime('ToyotaST185', 'gp España', 2, 2, 4);
        await createTime('AudiA3', 'gp España', 2, 2, 4);
        
        await createTime('ToyotaST185', 'gp España', 2, 2, 5);
        await createTime('AudiA3', 'gp España', 1, 2, 5);

        await createTime('ToyotaST185', 'gp España', 1, 2, 6);
        await createTime('AudiA3', 'gp España', 1, 2, 6);

        // for (let i = 1; i <= 6; i++) {
        //     let min1 = Math.floor(Math.random() * 3) + 1;
        //     let min2 = min1 + 1;
        //     await createTime('ToyotaST185', 'gp España', min1, min2, i);
        // }

        // for (let i = 1; i <= 5; i++) {
        //     let min1 = Math.floor(Math.random() * 3) + 1;
        //     let min2 = min1 + 1;
        //     await createTime('AudiA3', 'gp España', min1, min2, i);
        // }

        for (let i = 1; i <= 4; i++) {
            let min1 = Math.floor(Math.random() * 3) + 1;
            let min2 = min1 + 1;
            await createTime('MaseratiQuattroporte', 'gp Italia', min1, min2, i);
        }

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

const createTime = async (carBody, eventName, min1, min2, index) => {
    if (index > 0 && index < 7) {

        let eventSearch = await participationsModel.findOne({
            distinct: true,
            attributes: ['uuid', 't1', 't2', 't3', 't4', 't5', 't6', 'tTotal'],
            include:
                [
                    {
                        model: eventsModel,
                        attributes: ['name'],
                        where: { name: eventName }
                    },
                    {
                        model: carsModel,
                        attributes: ['body'],
                        where: { body: carBody },
                    }
                ]
        }
        );

        tTotal = await eventSearch.get('tTotal');
        // console.log('eventSearch ttotal -> ', tTotal);
        res = generateTime(min1, min2);
        // console.log('eventSearch time ts -> ', res);
        let ti = "t" + index.toString()
        let data = {};
        data[ti] = res.formattedTime

        if (tTotal == null) {
            tTotal = 0;
        }
        data['tTotal'] =  tTotal + res.timestamp;

        // console.log("my data -> ", data);
        let response = await eventSearch.update(data);
        // console.log('response -> ', response);
    }
}

const generateTime = (min1, min2) => {
    const randomMinutes = Math.floor(Math.random() * (min2 - min1 + 1)) + min1;
    const randomSeconds = Math.floor(Math.random() * 60);
    const randomMilliseconds = Math.floor(Math.random() * 1000);

    // const randomMinutes = min1;
    // const randomSeconds = 0;
    // const randomMilliseconds = 0;

    const formattedTime = `${randomMinutes}:${randomSeconds.toString().padStart(2, '0')}.${randomMilliseconds.toString().padStart(3, '0')}`;
    const timestamp = (randomMinutes * 60 + randomSeconds) * 1000 + randomMilliseconds;

    return {formattedTime,timestamp};
}

console.log('populating database...');
populateDatabase();