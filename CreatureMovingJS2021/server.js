const http = require('http');
const data = require("./obstacles.json")

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.write(JSON.stringify(data)); //write a response to the client
    res.end(); //end the response
}).listen(3010); //the server object listens on port 3010