
const jwt = require("jsonwebtoken");



const verifyToken = (req, res, next) =>{ // verifyToken middleware
    const bearerHeader = req.headers["authorization"]; // get the acces token from the header
    if(typeof bearerHeader !== "undefined"){ // if acces token is found
        const bearer = bearerHeader.split(" "); // split the acces token
        const bearerToken = bearer[1]; // get the acces token
        req.token = bearerToken; // set the acces token to req.token
        next(); // call next middleware
    }else{ // if acces token is not found
        res.sendStatus(403);
    }

    
}


module.exports = verifyToken;