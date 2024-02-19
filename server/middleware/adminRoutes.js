const express = require("express");

const adminRoutes = express.Router();

adminRoutes.use(async (req, res, next) => {
    if (req.token.role === "admin") {
        console.log("ACCESO API ADMIN USER");
        next();
    }else{
        res.status(401).send();
    }
    
});

module.exports = adminRoutes;