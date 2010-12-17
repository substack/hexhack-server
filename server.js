#!/usr/bin/env node
var DNode = require('dnode');
var Hash = require('traverse/hash');

var port = parseInt(process.argv[2], 10) || 80;
var web = require('./web');
web.listen(port);

var cafe = require('./places/cafe');
var players = {};

var server = DNode(function (client, conn) {
    this.play = function (name, pass, emit) {
        var player = players[conn.id] = {
            id : conn.id,
            name : name,
            emit : emit,
            role : client.role,
            stats : {
                hactivity : { level : 5, capacity : 5 },
                health : { level : 5, capacity : 5 },
            },
        };
        
        cafe.seating(player);
    };
}).listen(web);

if (process.argv[3]) {
    server.listen(parseInt(process.argv[3], 10));
}

server.on('localError', function (err) {
    console.error(err.stack ? err.stack : err);
});
