const loginRouter = require("express").Router();
const login = require('../controllers/login.controller');

loginRouter.post('/', login.login);
loginRouter.get('/logout', login.logout);

module.exports = loginRouter;