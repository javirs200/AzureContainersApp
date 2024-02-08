const usersModel = require("../models/users.model");
const carsModel = require("../models/cars.model");
const { validationResult } = require('express-validator');
let bcrypt = require('bcryptjs');
const uuidV4 = require('uuid')

const getMyCars = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const email = req.params.email
    let user = await usersModel.findOne({ where: { email: email } ,attributes: ['uuid']});
    if (user) {
      const userUuid = user.uuid 
      let cars = await carsModel.findOne({ where: { userUuid } });
      res.status(200).json({'userCars':cars});
    } else {
      res.status(400).json({ msg: "Las credenciales proporcionadas son incorrectas" });
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

const addCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let {email,carBrand,carModel,carBody} = req.body;

    let user = await usersModel.findOne({ where: { email: email } });
    if (user) {
      const userUuid = user.uuid 
      const uuid = uuidV4.v4()
      const data = {uuid,brand:carBrand,model:carModel,body:carBody,userUuid}
      let car = await carsModel.create(data);
      res.status(200).json({'created car ': car});
    } else {
      res.status(400).json({ msg: "no se ha podido crear "});
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

const updateCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let {uuid,carBrand,carModel,carBody} = req.body;

    let updatedCar = await carsModel.update({ brand:carBrand,model:carModel,body:carBody }, {
      where: {
        uuid: uuid,
      },
    });
    if (updatedCar) {
      res.status(200).json({'updated car ': updatedCar});
    } else {
      res.status(400).json({ msg: "no se ha podido actualizar "});
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

const deleteCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let {uuid} = req.body;

    let deletedCar = await carsModel.destroy({where:{uuid:uuid}})
    if (deletedCar) {
      res.status(200).json({'deleted car ': deletedCar});
    } else {
      res.status(400).json({ msg: "no se ha podido borar "});
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};



module.exports = {
  getMyCars,
  addCar,
  updateCar,
  deleteCar
};