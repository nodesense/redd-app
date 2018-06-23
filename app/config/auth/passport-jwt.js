var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");
const mongoose = require("mongoose")

const config = require("../index")

var User = mongoose.model("User")


var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),

jwtOptions.secretOrKey = config.jwt.secret;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
        //  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  User.findById(jwt_payload.id)
  .then(function(user){
      console.log("found user ", user.username)
      const userData = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        roles: [],
        //idenditiy of user like gender, country code etc
    }

      next(null, {id: user.id, username: user.username, roles: user.roles});
  })
  .catch(function() {
      console.log("could not find user");
      next("user not found", false);
  })
});

passport.use(strategy);