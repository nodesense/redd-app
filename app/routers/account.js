const express = require('express');
const router  = express.Router();

const mongoose = require("mongoose")
const User = mongoose.model("User")
  

const jwt = require('jsonwebtoken');
const passport = require("passport")
const config = require("../config")


router.get('/list', async function(req, res, next) {
    
    try {
        
       const query = User.find({}, null, { limit: 10 })
       const users = await query.exec()
       res.json(users)
    }catch (error) {
        //FIXME: should send error.errors
        res.status(400).json(error)
    }
});

router.get('/profile', function(req, res, next) {
    res.send(req.user);
});

//should be used only for client who has valid token
//but wants to refresh now
// if you want to expire old token, then you need to maintain a database
//records of all tokens, expired token should be removed from db,
// then write custom middleware to check if the token is there in db before allowing users
router.get('/refresh/token', function(req, res, next) {
    // take user from existing token, not a GOOD practice
    // RECOMMEDNED use fresh fetch for user User.findById and use the latest info
    const user = req.user
     // generate a signed json web token with the contents of user object and return it in the response
     const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
     return res.json({user, token});
});


module.exports = router;
