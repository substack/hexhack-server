var Room = require('./room');
//var Third = require('./third_avenue');
//var Erdos = require('./erdos_street');

var cafe = module.exports = {};

cafe.seating = Room(function (player, room) {
    room.show({
        exits : {
            //w : Erdos.CafeAutomaton,
            //s : Third[300],
            e : cafe.computers,
            n : cafe.counter,
        },
        description : 'You are in the Café Automaton seating area.'
    });
});

var orders = {};

cafe.counter = Room(function (player, room) {
    room.exits = {
        s : cafe.seating,
        se : cafe.computers,
    };
    
    var order = orders[player.id];
    if (order && order.ready) {
        room.description =
            'Your ' + order.type + ' sits in the wire drink chute, cooling.'
            + ' The LCD display above the chute points down at each drinks with'
            + ' a black arrow and a name. Above yours, it says ' + player.name
            + '.'
        ;
    }
    else if (order) {
        room.description =
            'The machine at the counter is whirring and foaming away.'
        ;
    }
    else {
        room.description =
            'You walk up to the counter to place your order.\n'
            + ' Where you expect to find baristas you instead find a hackish'
            + ' bundle of wires, servos, and scraps of metal strapped to an'
            + ' espresso machine. You remember that this is the Café Automaton.'
            + ' A sign reads: place orders from your cell phone, laptop, or the'
            + ' computers in the corner.\n'
            + 'You feel like a tourist.'
        ;
    }
    
    room.show();
});

cafe.computers = Room(function (player, room) {
    room.exits = {
        w : cafe.seating,
        nw : cafe.counter,
    };
    room.description = 'Ahead of you sit some computers along a narrow wooden'
        ' table placed rather highly upon on the wall. Barstools '
    ;
    
    room.show();
});
