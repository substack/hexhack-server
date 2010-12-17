var express = require('express');
var app = module.exports = express.createServer();

app.get('/dnode.js', require('dnode/web').route());

app.get('/', function (req, res) {
    res.render('index.jade');
});
