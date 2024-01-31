const express = require("express");

const adminRoutes = express.Router();

adminRoutes.use(async (req, res, next) => {
    if (req.token.role === "administrador") {
        console.log("ADMIN USER");
        next();
    }else{
        res.status(401).send();
    }
    
});

module.exports = adminRoutes;