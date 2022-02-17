const jwt = require('jsonwebtoken');

const getToken = (user) => {
    return jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.TOKEN_KEY);
}

const auth = (req, res, next) => {
    const bearer = req.header('Authorization');
    if(!bearer){
        return res.sendStatus(401);
    }
    try{
        const bearerToken = bearer.split(' ')[1];
        const user = jwt.verify(bearerToken, process.env.TOKEN_KEY);
        req.user = user;
        next();
    }
    catch(err){
        res.sendStatus(401);
    }
}

const admin = (req, res, next) => {
    auth(req, res, () => {
        if(req.user.isAdmin){
            next();
        }
        else{
            res.sendStatus(403);
        }
    })
}

module.exports = {getToken, auth, admin};

