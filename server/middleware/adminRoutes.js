const express = require("express");

const adminRoutes = express.Router();

adminRoutes.use(async (req, res, next) => {
    if (req.token.role === "admin") {
        console.log("api call admin user ", req.token.email);
        next();
    }else{
        res.status(401).send();
    }
    
});

module.exports = adminRoutes;