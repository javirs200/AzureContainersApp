const eventRouter = require("express").Router();
const eventController = require('../controllers/events.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

eventRouter.get("/all", eventController.getAll);
eventRouter.get("/byName/:name", eventController.getByName);
eventRouter.post("/new/",eventController.newEvent)
eventRouter.put("/update/", eventController.updateByName);
eventRouter.delete("/remove/", eventController.deleteEvent);

module.exports = eventRouter;