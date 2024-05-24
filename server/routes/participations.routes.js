const participationsRouter = require("express").Router();
const participationsController = require('../controllers/participations.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

participationsRouter.get("/getMyParticipations/:email",getAccessToken,participationsController.getMyParticipations)
participationsRouter.post("/new/",getAccessToken,participationsController.newParticipation)
participationsRouter.delete("/delete/",getAccessToken,participationsController.deleteParticipation)
participationsRouter.put("/addTime/",participationsController.addTime);

participationsRouter.get("/getParticipations/:eventName",participationsController.getEventParticipations)


module.exports = participationsRouter;