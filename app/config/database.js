var mongoose = require("mongoose");

const config = require("./index")
 
module.exports = function(app) {
    //TODO: if connect fails, kill the app
    mongoose.connect(config.mongodb.url);
}