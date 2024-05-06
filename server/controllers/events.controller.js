const eventsModel = require("../models/events.model");
const { validationResult } = require('express-validator');
const uuidV4 = require('uuid')

const newEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {name,description,date} = req.body;

    const uuid = uuidV4.v4()

    const data = {uuid,name,description,date}

    // console.log('datos para guardar en dB ', data);
    const answer = await eventsModel.create(data);
    res.status(201).json(answer);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
  };

const getAll = async (req, res) => {
    try {
        const users = await eventsModel.findAll({ attributes: ['uuid','name', 'date', 'description'] });
        res.status(200).json(users);
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
};


const getByName = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const name = req.params.name
        let event = await eventsModel.findOne({ where: { 'name': name }});
        if (event) {
            res.status(200).json({ 'EventData': event });
        } else {
            res.status(404).json({ msg: "event not found" });
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(400).json({ msj: `ERROR: ${error}` });
    }
};

const updateByName = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let {uuid,name,description,date} = req.body;

    let updatedEvent = await eventsModel.update({ name,description,date }, {
      where: {
        uuid: uuid,
      },
    });
    if (updatedEvent) {
      res.status(200).json({'updated Event ': updatedEvent});
    } else {
      res.status(400).json({ msg: "no se ha podido actualizar Evento "});
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

const deleteEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let {name} = req.body;

    let deletedEvent = await eventsModel.destroy({where:{name:name}});
    if (deletedEvent) {
      res.status(200).json({'deleted Event count': deletedEvent});
    } else {
      res.status(400).json({ msg: "no se ha podido borar "});
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

module.exports = {
    getByName,
    updateByName,
    getAll,
    newEvent,
    deleteEvent
};