const jwt = require('jsonwebtoken');
require('dotenv').config();


const authorize = (req,res,next) => {
    const token = req.header('Authorization');
    const bearerWord = (token.split(" ")[0]).trim();
    const bearerToken = (token.split(" ")[1]);
    if(bearerWord != "Bearer"){
        return res.status(401).json({message: 'invalid header'});
    }
    if(!bearerToken){
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    try{
       const decoded = jwt.verify(bearerToken, 'Rudra');
       req.user = decoded.userId;
       next();
    }
    catch(error){
        res.status(401).send({ error: 'Token is not valid' });
    }
}

module.exports = authorize;