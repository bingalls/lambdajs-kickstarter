"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process"); // spawn instead of exec for large data
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var favicon = require("serve-favicon");
var app = express();
var domain = 'localhost';
var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
};
var nodever = 'nodejs12.x';
var port = 3010;
app.options('*', cors());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    child_process_1.exec("docker run --rm -v $PWD:/var/task:ro,delegated lambci/lambda:" + nodever + " " +
        "get.handler '{\"http\": {\"method\": \"get\"}}' -p 9001:9001", function (error, stdout) {
        if (error) {
            res.send("<pre>error: " + error.message + "</pre>");
            return;
        }
        res.set(headers);
        res.send(("" + stdout).replace(/\\"/g, '"'));
    });
});
app.post('/', function (req, res) {
    var datetime = req.body.date.substr(0, 10); // trim time off the end
    child_process_1.exec("docker run --rm -v $PWD:/var/task:rw,delegated lambci/lambda:" + nodever + " post.handler '" +
        ("{\"date\": \"" + datetime + "\", \"organizer\": \"" + req.body.organizer + "\", \"venue\": \"" + req.body.venue + "\"}' -p 9001:9001"), function (error, stdout) {
        if (error) {
            res.send("<pre>error: " + error.message + "</pre>");
            return;
        }
        res.set(headers);
        res.send(stdout);
    });
});
app.listen(port, function () { return console.log("http server at http://" + domain + ":" + port); });
