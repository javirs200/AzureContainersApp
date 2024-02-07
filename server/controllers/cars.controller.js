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
    let user = await usersModel.findOne({ where: { email: email } });
    if (user) {
      const userUuid = user.uuid 
      console.log('user uuid' ,userUuid);
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

module.exports = {
  getMyCars
};