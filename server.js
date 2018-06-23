var app = require("./app");

var http=require("http");

//express application
var server = http.createServer(app)

//socket.io application
//require("./app/socket/chat") (server);

// for testing purpose
module.exports = server

const parseArgs = require('minimist') (process.argv.slice(2))


console.log("options ", parseArgs);

const PORT  = parseInt(parseArgs.port) || 8080
console.log("port ", PORT);

var HOST = parseInt(parseArgs.host) || '0.0.0.0'
console.log("hostname ", HOST);

 
server.listen(PORT, HOST, function(err){

if (err) {
    console.error("Could not listen ", err);
    return;
}

console.log("callback ", server.address());

});

