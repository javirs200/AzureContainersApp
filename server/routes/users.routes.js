const userRouter = require("express").Router();
const userController = require('../controllers/users.controller')

//middlewares de control de acceso a rutas protegidas
const getAccessToken = require('../middleware/getAccessToken');
const decodeToken = require('../middleware/decodeToken');
const adminRoutes = require('../middleware/adminRoutes');
const clientRoutes = require('../middleware/clientRoutes');
const apiKeyValidator = require('../middleware/apiKeyValidator')

// // POST // con api key para primer user
userRouter.post("/create",apiKeyValidator, userController.createUser);
// // POST // allow regiistration with default role
userRouter.post("/register",userController.createUserDriver);

// protected routes jwt
userRouter.put("/privileges",getAccessToken,decodeToken,adminRoutes,userController.updatePrivileges);
userRouter.get('/',getAccessToken,decodeToken,adminRoutes,userController.getAllUsers);
userRouter.get("/:email",getAccessToken,decodeToken,adminRoutes, userController.readUser);
userRouter.delete("/delete",getAccessToken,decodeToken,adminRoutes, userController.deleteUser);


module.exports = userRouter;