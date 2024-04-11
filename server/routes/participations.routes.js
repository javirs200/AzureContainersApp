const participationsRouter = require("express").Router();
const participationsController = require('../controllers/participations.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

participationsRouter.post("/new/",getAccessToken,participationsController.newParticipation)
participationsRouter.put("/addTime/", participationsController.addTime);

participationsRouter.get("/getParticipations/:eventName",participationsController.getEventParticipations)

module.exports = participationsRouter;