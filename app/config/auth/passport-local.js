
var passport = require('passport');
var passportLocal =  require('passport-local');

const mongoose = require("mongoose")

var User = mongoose.model("User")
 
 
//Local strategy for authencation with 
//local db, ,mysql, mongodb
//custom authentication
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
        //during user login, this function called
        function(username, password, cb) {

        console.log("Local Strategy", username, password);

    
    User.findOne({username: username})
    .then(function(user){
        //if user not present

        if (!user){
            cb("user not found", false);
            return;
        }

        //user found
        
        console.log("user found ", user);

        
        user.comparePassword(password, (err, isMatch) => {
            console.log("compare result ", err, isMatch)

            if (err) {
                cb("password not matched", null);
                return
            } 

            console.log("valid user");
            const userData = {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                dob: 2000
            }
            cb(null, userData);
        })

      

    })
    .catch (error => {
        console.log("Error while fetching users", error)
    })
            })
)
