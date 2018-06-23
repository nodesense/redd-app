var passport = require('passport');
var passportLocal =  require('passport-local');

const mongoose = require("mongoose")
var User = mongoose.model("User")

require("./auth/passport-local")
require("./auth/passport-github")
require("./auth/passport-jwt")

module.exports = function(app) {
    console.log("app passed to passport auth");
    app.use(passport.initialize());
    app.use(passport.session());


    //save to session
    passport.serializeUser(function(user, cb) {
            console.log("serializeUser")


            //delete user.hash;
            //delete user.salt;
            
            cb(null, user);
            //cb(null, user.username);
        });


    //retrive from session
    //for every upcoming request post login
    passport.deserializeUser(function(user, cb) {
        console.log("deserializeUser")
        cb(null, user);
    });
}
