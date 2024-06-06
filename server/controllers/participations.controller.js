const participationsModel = require("../models/participations.model");
const eventsModel = require("../models/events.model");
const carsModel = require("../models/cars.model");
const { validationResult, body } = require('express-validator');
const uuidV4 = require('uuid');
const usersModel = require("../models/users.model");
const { Sequelize,Op, DATE, STRING } = require("sequelize");

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
                let searchForParticipation = await participationsModel.findOne({ where: { carUuid, eventUuid } });
                if (!searchForParticipation) {
                    console.log("respuesta -> ", searchForParticipation);
                    const uuid = uuidV4.v4()
                    const data = { uuid, eventUuid, carUuid }
                    const participation = await participationsModel.create(data)
                    res.status(201).json({ 'created participation ': participation });
                } else {
                    res.status(400).json({ msg: "ya estas participando en este evento" });
                }
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

const getMyParticipations = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const email = req.params.email
        let eventSearch = await participationsModel.findAll({
            attributes: ['uuid'],
            include:
                [
                    {
                        model: eventsModel,
                        attributes: ['name'],
                    },
                    {
                        model: carsModel,
                        attributes: ['body'],
                        where: { body: { [Op.not]: null } },
                        include:
                        {
                            model: usersModel,
                            attributes: [],
                            where: { email: email }
                        }
                    }
                ]
        }
        );
        if (eventSearch) {
            res.status(200).json(eventSearch);
        } else {
            res.status(400).json({ msg: "no se ha podido encontrar las participaciones " });
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
}

const addTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { carUuid, eventUuid, time, index } = req.body;

        if (index > 0 && index < 7) {

            let data = { carUuid, eventUuid }

            data["t" + index.toString()] = time

            // console.log("my data -> ", data);

            let participation = await participationsModel.update(data, { where: { carUuid, eventUuid } });
            if (participation) {
                res.status(200).json({ 'added time ': participation });
            } else {
                res.status(400).json({ msg: "no se ha podido encontrar la participacion " });
            }
        } else {
            res.status(400).json({ msg: "indice fuera de rango" });
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
        const name = req.params.eventName
        if (name) {

            let eventSearch = await participationsModel.findAll({
                distinct: true,
                attributes: ['uuid', 't1', 't2', 't3', 't4', 't5', 't6','tTotal'],
                include:
                    [
                        {
                            model: eventsModel,
                            attributes: ['name'],
                            where: { name }
                        },
                        {
                            model: carsModel,
                            attributes: ['body'],
                            include:
                            {
                                model: usersModel,
                                attributes: ['name']
                            }
                        }
                    ],
                order: [['tTotal', 'ASC']]
            }

            );
            if (eventSearch) {
                res.status(200).json(eventSearch);
            } else {
                res.status(400).json({ msg: "no se ha podido encontrar los tiempos " });
            }
        } else {
            res.status(400).json({ msg: "no se ha podido encontrar el evento " });
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
};

const deleteParticipation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { uuid } = req.body;

        let deleted = await participationsModel.destroy({ where: { uuid } });

        if (deleted) {
            res.status(200).json({ msg: 'deleted participation ' });
        } else {
            res.status(400).json({ msg: "no se ha podido eliminar la participacion " });
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
};


module.exports = {
    getEventParticipations,
    getMyParticipations,
    newParticipation,
    deleteParticipation,
    addTime,
};