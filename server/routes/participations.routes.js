const participationsRouter = require("express").Router();
const participationsController = require('../controllers/participations.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

participationsRouter.post("/new/",participationsController.newParticipation)
participationsRouter.put("/addTime/", participationsController.addTime);

module.exports = participationsRouter;