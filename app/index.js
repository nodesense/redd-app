const express = require("express");
const path = require("path");
var passport = require('passport');

const csrf = require('csurf'); 

const session = require('express-session');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
 
const cors = require("cors")

require("./models")

const logger = require("./config/logger")
logger.info("start logging here")


const app = express();

app.disable('etag') ;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser('fDgfaRT243FDFrAS')); 

require("./config/access-log")(app);
require("./config/view-engine")(app);
require("./config/database")(app);
 
require("./config/session")(app);
require("./config/passport")(app);

app.use(cors())
  
app.use(function(req, res, next){
    res.locals.user = req.user;
    
    console.log("Second middleware ", req.user );
    next();
})

app.use(require("./routers/auth"))

app.use('/account', 
        passport.authenticate('jwt', {session: false}), 
        require("./routers/account"))

app.use('/posts', 
        passport.authenticate('jwt', {session: false}), 
        require("./routers/post"))


app.use('/channels', 
        passport.authenticate('jwt', {session: false}), 
        require("./routers/channel"))

app.use(function(error, req, res, next) {
    console.log("Errors ", error);

    //FIXME: log with call stack
    logger.error(error);

    res.status(500)
        .render("errors/internal-error", {
            stack: error.stack
        })
    //handle error
})
 

module.exports = app  