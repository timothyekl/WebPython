jQuery(function($, undefined) {

    $('#interpreter').terminal(function(command, term) {
        // Do ajaxy things
        $.ajax("/input", {
            data: {'input' : command},
            dataType: 'text',
            error: function(jqxhr, textStatus, errorThrown) {
                alert("Error. Refresh. Sorry!");
            },
            success: function(data, textStatus, jqxhr) {
                term.echo(String(data));
            },
            type: 'POST'
        });
    }, {
        greetings: '',
        name: 'python_demo',
        height: 400,
        prompt: '>>>',
        onInit: function(term) {
            term.echo($('#initial').text());
        }
    });

});
