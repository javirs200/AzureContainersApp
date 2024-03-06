const eventRouter = require("express").Router();
const eventController = require('../controllers/events.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

eventRouter.get("/all", eventController.getAll);
eventRouter.get("/byName/:name", getAccessToken,decodeToken,clientRoutes,eventController.getByName);
eventRouter.post("/new/",getAccessToken,decodeToken,adminRoutes,eventController.newEvent)
eventRouter.put("/update/",getAccessToken,decodeToken,adminRoutes, eventController.updateByName);
eventRouter.delete("/remove/",getAccessToken,decodeToken,adminRoutes, eventController.deleteEvent);

module.exports = eventRouter;