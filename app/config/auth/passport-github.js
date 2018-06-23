var passport = require("passport");

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: "46e04bcf31b15c5f5c17",
    clientSecret: "e3f2362e2a4e044007eaa1fcaf195f4de89fd1c9",
    callbackURL: "http://localhost:8080/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
    console.log("profile ", profile);
    
    var user = {
        id:   profile.id,
        scheme: 'github'
    }
    return cb(null, user);
}
));
 
