var Hash = require('traverse/hash');
var EventEmitter = require('events').EventEmitter;

module.exports = function Room (cb) {
    var room = new EventEmitter;
    room.players = {};
    room.description = '';
    
    return function (player) {
        room.emit('enter', player);
        room.players[player.id] = player;
        
        var pr = {};
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
                    function (ex) { return ex.bind(ex, player) }
                )
            });
        };
        
        var r = Hash.merge(room, pr);
        cb(player, r);
    };
};
