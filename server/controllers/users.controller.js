const usersModel = require("../models/users.model");
const { validationResult } = require('express-validator');
let bcrypt = require('bcryptjs');
const uuidV4 = require('uuid')

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

const readUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const email = req.body.email
    let user = await usersModel.findOne({ where: { email: email } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ msg: "Las credenciales proporcionadas son incorrectas" });
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {nombre,apellido,email,password,rol} = req.body;

    if (rol == null) {
      //default role unprivileged user
      rol = 'asesor';
    }
    password = await bcrypt.hash(password,10)

    const id_usuario = uuidV4.v4()

    const data = {id_usuario,nombre,apellido,email,password,rol}

    console.log('datos para guardar en dB ', data);
    const answer = await usersModel.create(data);
    res.status(201).json(answer);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email} = req.body;
    if (email) {
      let result = await usersModel.destroy({ where: { email: email } });
      if (result.deletedCount == 0)
        res.status(400).json({ message: `User con email ${email} no encontrado` });
      else
        res
          .status(200)
          .json({ message: "User BORRADO", user: { data } });
    } else {
      res.status(400).json({ message: "formato de User erroneo" });
    }
  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(400).json({ msj: `ERROR: ${error}` });
  }
};

module.exports = {
  readUser,
  createUser,
  deleteUser,
  getAllUsers,
};
