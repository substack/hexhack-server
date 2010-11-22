#!/usr/bin/env node

var DNode = require('dnode');
var Hash = require('traverse/hash');

var cafe = require('./places/cafe');
var players = {};

var server = DNode(function (client, conn) {
    this.play = function (name, pass, emit) {
        var player = players[conn.id] = {
            id : conn.id,
            name : name,
            emit : emit,
            role : client.role,
        };
        
        cafe.seating(player);
    };
}).listen(7331);

server.on('localError', function (err) {
    console.error(err.stack ? err.stack : err);
});
