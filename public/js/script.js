function inrange(item, lower, upper) {
    return lower <= item && item <= upper;
}

function py_specialchar(item) {
    return inrange(item, 32, 126)
            && !(inrange(item, 48, 57) || inrange(item, 65, 90) || inrange(item, 97, 122));
}

function py_normalchar(item) {
    return inrange(item, 32, 126) && !py_specialchar(item);
}

$(document).ready(function() {
    accumulator = "";

    $("textarea#interpreter").keypress(function(event) {
        passthrough = [13]
        if(event.which >= 32 && event.which <= 126) {
            accumulator = accumulator + String.fromCharCode(event.which);
        } else if(passthrough.indexOf(event.which) != -1) {
            // Do nothing - pass through
        } else {
            event.preventDefault();
        }
    });

    // Keydown delivers modifier keys, but is inaccurate about characters
    $("textarea#interpreter").keydown(function(event) {
        if(event.which == 8 && accumulator.length > 0) { // backspace
            accumulator = accumulator.substr(0, accumulator.length - 1);
        } else if(event.which == 13) { // enter
            $.ajax("/input", {
                data: {'input' : accumulator},
                dataType: 'text',
                error: function(jqxhr, textStatus, errorThrown) {
                    alert("Error. Refresh. Sorry!");
                },
                success: function(data, textStatus, jqxhr) {
                    $("textarea#interpreter").val($("textarea#interpreter").val() + data);
                    accumulator = "";
                },
                type: 'POST'
            });
        } else if(event.which < 32) {
            event.preventDefault();
        }
    });

});
