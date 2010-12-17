function Client (mud) {
    var em = new EventEmitter;
    var room = null;
    
    var self = {};
    self.eval = function (line) {
        you(line);
        
        var cmd = (function (m) {
            return m ? m[1] : undefined
        })(line.match(/^\s*(\S+)/));
        
        if (line == '') {
            showRoom(room);
        }
        else if (cmd in room.exits) {
            var args = line.match(/^\s*\S+\s*(.*)/)[1].split(' ');
            room.exits[cmd].apply({}, args);
        }
        else {
            puts('You can\'t just make up commands. '
                + 'Well actually you can, '
                + 'but you haven\'t made that one up yet.'
            );
        }
        
        $('#ui').animate({
            scrollTop : $('#ui').attr('scrollHeight')
        }, 400);
    };
    
    function showRoom (r) {
        puts(room.description);
        puts('Exits: ' + Object.keys(room.exits).join(' '));
    }
    
    function puts (msg) {
        $('<div>').text(msg).appendTo($('#console'));
    }
    
    function you (msg) {
        $('<div>')
            .addClass('you')
            .text(msg)
            .appendTo($('#console'))
        ;
    }
    
    em.on('room', function (r) {
        room = r;
        showRoom(r);
    });
    
    var emit = function () { return em.emit.apply(em, arguments) };
    mud.play('meow', 'zing', emit);
    
    return self;
}
