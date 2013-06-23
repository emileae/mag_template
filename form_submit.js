$(document).ready(function(){
    
        var email_form ='<div id="form_popup">\
        <div id="form_overlay">\
        </div>\
        <div id="form_well">\
        <form action="/pg_request" method="post" id="pg_request_form">\
\
            <label for="email">\
                <b>Email</b>\
                <input type="email" id="pg_email" name="email">\
            </label>\
            \
            <input type="submit" value="submit">\
\
        </form>\
        </div>\
        <div id="form_close">\
            HIDE\
        </div>\
    </div>'
    
    // Handling a form submission
    $('body').on('tap click', '.button_popup', function (){
        $('body').append(email_form);
    });
    $('body').on('tap click', '#form_close', function (){
        $('#form_popup').remove();
    });
    
    $('body').on('submit', '#pg_request_form', function(){
        var email = $('#pg_email').val();
        $.ajax({
            type: 'POST',
            data: {email:email},
            url: 'http://e-m-i-l-e.appspot.com/pg_request',
            success: function(data){
                console.log(data);
                alert('Your comment was successfully added');
            },
            error: function(data){
                console.log(data);
                alert('There was an error adding your comment');
            }
        });
        return false;
    });
    
});