const express = require("express");
const getAccessToken = express.Router();


getAccessToken.use(async (req, res, next) => {
    const { cookie } = req.headers;
    if(cookie){
        if (cookie.includes(`access_token=`)) {
            const cookies = cookie.split(',');
            const accessToken = cookies[0];
            const token = accessToken.split('=')[1];
            if (token) {
                req.token = token;
                next();
            } else {
                console.log("fallo al leer token");
                res.sendStatus(403)
            }
        } else {
            console.log("no hay token en cookie");
            res.sendStatus(403)
        };
    } else {
        console.log("no hay cookie");
        res.sendStatus(403)
    };
});


module.exports = getAccessToken;
