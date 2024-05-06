const carsRouter = require("express").Router();
const carsController = require('../controllers/cars.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

carsRouter.get("/getfromUser/:email",getAccessToken,decodeToken,carsController.getMyCars);
carsRouter.post("/addtoUser/",getAccessToken,decodeToken,carsController.addCar)
carsRouter.put("/update/",getAccessToken,decodeToken,carsController.updateCar);
carsRouter.delete("/remove/",getAccessToken,decodeToken,carsController.deleteCar);

module.exports = carsRouter;