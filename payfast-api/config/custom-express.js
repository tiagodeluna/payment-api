var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var validator = require('express-validator');

module.exports = function() {
    var app = express();

    //Add midwares to handle URL enconded and JSON formats
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    //Add validation implementation to the request objects
    app.use(validator());

    consign()
        .include('controllers')
        .then('persistence')
        .then('services')
        .into(app);

    return app;
}