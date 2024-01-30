const express = require("express");

const userRoutes = express.Router();

userRoutes.use(async (req, res, next) => {
    if (req.token.role === "asesor" || req.token.role === "administrador") {
        console.log("CLIENT USER");
        next();
    } else {
        res.status(401).send();
    }

});

module.exports = userRoutes;








