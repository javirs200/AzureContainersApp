const userRouter = require("express").Router();
const userController = require('../controllers/users.controller')
const carsController = require('../controllers/cars.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

// // POST // con api key para primer user
userRouter.post("/create", userController.createUser);

// GET client asesor route demo by email
userRouter.get("/:email", userController.readUser);
userRouter.get("/mycars/:email", carsController.getMyCars);

//client /api/users/all asesor route demo // when definitive  add middlewares
userRouter.get('/all',userController.getAllUsers);

module.exports = userRouter;