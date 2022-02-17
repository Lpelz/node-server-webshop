const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const {getToken} = require('../middleware/token');

router.post('/registration', async (req, res) => {
    try{
        const userWithUsername = await User.findOne({username : req.body.username});
        if(userWithUsername){
            return res.status(401).json({message: 'username already used'});;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        const savedUser = await user.save();
        res.status(200).json({_id: savedUser._id, username: savedUser.username, email: savedUser.email, token: getToken(savedUser)});
    }
    catch(error){
        res.status(500).json({message: 'registration failed'});
    }
});

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user){
            return res.status(401).json({message: 'incorrect username'});;
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(401).json({message: 'incorrect password'});
        }
        res.status(200).json({_id: user._id, username: user.username, email: user.email, token: getToken(user)});
    }
    catch(error){
        res.status(500).json({message: 'login failed'});
    }
});

module.exports = router;