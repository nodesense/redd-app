const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport")

const config = require("../config")

const mongoose = require("mongoose")
const User = mongoose.model("User")

router.post('/login', function (req, res, next) {
    console.log("login called ", req.body)
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });

        }
        console.log("Trying to login now", user)

        user.dob = 2000

        //req.login from passport 
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed json web token with the contents of user object and return it in the response
           const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
           
           
           return res.json({user, token});
        });
    })(req, res);
});


router.post('/register', async function (req, res) {
    console.log("register ", req.body)
     const user = new User()

     user.username = req.body.username
     user.password = req.body.password
     user.email = req.body.email

     try {
         await user.save()
         res.json(user)
     }
     catch(e) {
         console.log(e)
         res.status(500).json({error: "unknown error on server", errors: e.errors})
     }
});

router.get('/profile', function(req, res, next) {
    res.send(req.user);
});


module.exports = router;
