var Hash = require('traverse/hash');
var EventEmitter = require('events').EventEmitter;

module.exports = function Room (cb) {
    var room = new EventEmitter;
    room.players = {};
    room.commands = {};
    room.artifacts = {};
    room.description = '';
    
    return function (player) {
        room.emit('enter', player);
        room.players[player.id] = player;
        
        var pr = {};
        
        pr.enter = function (place) {
            place(player);
        }; 
        
        pr.show = function (params) {
            Hash.update(r, params || {});
            
            player.emit('room', {
                description : r.description,
                players : Hash.map(
                    room.players,
                    function (p) { return p.name }
                ),
                exits : Hash.map(
                    r.exits,
                    function (ex) { return pr.enter.bind(pr, ex) }
                )
            });
        };
        
        var r = Hash.merge(room, pr);
        cb(player, r);
    };
};
