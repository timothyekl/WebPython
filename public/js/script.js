function dedent(str) {
    lines = str.split("\n");
    whitespace = 0;
    for(i = 0; i < lines[0].length; i++) {
        if(lines[0][i] != " ") {
            break;
        }
        whitespace += 1;
    }

    dedented = [];
    for(i = 0; i < lines.length; i++) {
        dedented[i] = lines[i].substr(whitespace);
    }
    return dedented.join("\n");
}

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
            timeout: 1000,
            type: 'POST'
        });
    }, {
        greetings: '',
        name: 'python_demo',
        height: 400,
        prompt: '>>>',
        onInit: function(term) {
            init = $('#initial').text().substr(1);
            init = init.substr(0, init.length - 8);
            term.echo(dedent($('#initial').text().substr(1)));
        }
    });

});
