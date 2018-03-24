var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var validator = require("express-validator");
var morgan = require("morgan");
var logger = require("../services/logger.js");

module.exports = function() {
    var app = express();

    //Add Morgan middleware to intercept requests and generate automatic
    // logs using Winston (from logger.js)
    app.use(morgan(
        "common", //Log format according to Apache commons definition
        { stream: {
            write: function(msg){
                logger.info(msg);
            }
        }}
    ));

    //Add middlewares to handle URL enconded and JSON formats
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    //Add validation implementation to the request objects
    app.use(validator());

    consign()
        .include("controllers")
        .then("persistence")
        .then("services")
        .into(app);

    return app;
}