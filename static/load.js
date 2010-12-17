$(window).load(function () {
    DNode.connect(function (remote, conn) {
        var client = Client(remote);
        
        $('#ui form').submit(function (ev) {
            ev.preventDefault();
            var line = $('#cmd').val();
            $('#cmd').val('');
            client.eval(line);
        });
        
        $('#cmd').focus();
    });
});
