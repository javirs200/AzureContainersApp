const participationsModel = require("../models/participations.model");
const eventsModel = require("../models/events.model");
const carsModel = require("../models/cars.model");
const { validationResult } = require('express-validator');
const uuidV4 = require('uuid');

const newParticipation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { carUuid, eventUuid } = req.body;

        let event = await eventsModel.findOne({ where: { uuid: eventUuid } });
        if (event) {
            let car = await carsModel.findOne({ where: { uuid: carUuid } });
            if (car) {
                const data = { userUuid,carUuid }
                const participation = await participationsModel.create(data)
                res.status(200).json({ 'created participation ': participation });
            } else {
                res.status(400).json({ msg: "no se ha podido encontrar el coche " });
            }

        } else {
            res.status(400).json({ msg: "no se ha podido encontrar el evento " });
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
};

const addTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { carUuid, eventUuid , time , index } = req.body;

        data = {carUuid,eventUuid}

        data["t"+index.toString()] = time

        console.log("my data -> ", data);

        let participation = await participationsModel.update(data,{ where: { carUuid, eventUuid } });
        if (participation) {
            res.status(200).json({ 'added time ': participation });
        } else {
            res.status(400).json({ msg: "no se ha podido encontrar la participacion " });
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
};

const getEventParticipations = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const name = req.params.name
        let event = await eventsModel.findOne({ where: { name } , attributes: ['name', 'uuid']});
        if (event) {
            let participations = await participationsModel.findAll({ where: { eventUuid: event.uuid } });
            if (participations) {
                res.status(200).json({ 'all times ': participations });
            } else {
                res.status(400).json({ msg: "no se ha podido encontrar los tiempos " });
            }
        }else{
            res.status(400).json({ msg: "no se ha podido encontrar el evento " });
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
};


module.exports = {
    getEventParticipations,
    newParticipation,
    addTime,
};