const carsRouter = require("express").Router();
const carsController = require('../controllers/cars.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

carsRouter.get("/getfromUser/:email", carsController.getMyCars);
carsRouter.post("/addtoUser/",carsController.addCar)
carsRouter.put("/update/", carsController.updateCar);
carsRouter.delete("/remove/", carsController.deleteCar);

module.exports = carsRouter;