const express = require("express");

const userRoutes = express.Router();

userRoutes.use(async (req, res, next) => {
    if (req.token.role === "driver" || req.token.role === "administrador") {
        console.log("api call client user ", req.token.email);
        next();
    } else {
        res.status(401).send();
    }

});

module.exports = userRoutes;








